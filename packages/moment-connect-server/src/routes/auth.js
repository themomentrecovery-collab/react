import express from 'express';
import bcrypt from 'bcrypt';
import speakeasy from 'speakeasy';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { query } from '../db/pool.js';
import { config } from '../utils/env.js';
import { audit } from '../utils/audit.js';

export const authRouter = express.Router();

authRouter.post(
  '/register',
  [
    body('name').isString().isLength({ min: 2 }),
    body('email').isEmail(),
    body('password').isLength({ min: 12 }),
    body('role').isIn(['agency', 'admin', 'facility']),
    body('organization').optional().isString().isLength({ min: 2 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, role, organization } = req.body;
    const existing = await query('SELECT id FROM users WHERE email=$1', [email]);
    if (existing.rowCount > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const mfaSecret = speakeasy.generateSecret({ length: 20 }).base32;
    const result = await query(
      'INSERT INTO users (name, email, password_hash, role, mfa_secret, organization) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, role, created_at',
      [name, email, passwordHash, role, mfaSecret, organization ?? null]
    );
    await audit(req.user?.id ?? result.rows[0].id, 'user.register', 'users', { email, role });
    return res.status(201).json({ message: 'User registered', mfaSecret });
  }
);

authRouter.post(
  '/login',
  [body('email').isEmail(), body('password').isString(), body('token').isString()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, token } = req.body;
    const userResult = await query('SELECT * FROM users WHERE email=$1', [email]);
    if (userResult.rowCount === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const user = userResult.rows[0];
    const passwordMatches = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatches) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const verified = speakeasy.totp.verify({
      secret: user.mfa_secret,
      encoding: 'base32',
      token,
      window: 1,
    });
    if (!verified) {
      return res.status(401).json({ error: 'Invalid MFA token' });
    }
    const jwtToken = jwt.sign(
      { id: user.id, role: user.role, name: user.name },
      config.jwtSecret,
      { expiresIn: '8h' }
    );
    await audit(user.id, 'user.login', 'sessions', {});
    return res.json({ token: jwtToken, role: user.role, name: user.name });
  }
);

authRouter.post(
  '/mfa/verify',
  [body('secret').isString(), body('token').isString()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { secret, token } = req.body;
    const verified = speakeasy.totp.verify({ secret, encoding: 'base32', token, window: 1 });
    return res.json({ verified });
  }
);
