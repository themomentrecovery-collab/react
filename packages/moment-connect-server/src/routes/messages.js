import express from 'express';
import { body, param, validationResult } from 'express-validator';
import { authenticate } from '../middleware/auth.js';
import { query } from '../db/pool.js';
import { audit } from '../utils/audit.js';

export const messageRouter = express.Router();

messageRouter.use(authenticate);

async function ensureReferralAccess(user, referralId) {
  const referral = await query('SELECT agency_id, facility_id FROM referrals WHERE id=$1', [referralId]);
  if (referral.rowCount === 0) {
    return false;
  }
  const record = referral.rows[0];
  if (user.role === 'admin') {
    return true;
  }
  if (user.role === 'agency' && record.agency_id === user.id) {
    return true;
  }
  if (user.role === 'facility' && record.facility_id === user.id) {
    return true;
  }
  return false;
}

messageRouter.get('/:referralId', [param('referralId').isUUID()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { referralId } = req.params;
  const canAccess = await ensureReferralAccess(req.user, referralId);
  if (!canAccess) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  const result = await query(
    'SELECT * FROM messages WHERE referral_id=$1 ORDER BY created_at ASC',
    [referralId]
  );
  return res.json({ messages: result.rows });
});

messageRouter.post(
  '/',
  [
    body('referral_id').isUUID(),
    body('receiver_id').isUUID(),
    body('message').isString().isLength({ min: 1, max: 5000 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { referral_id, receiver_id, message } = req.body;
    const canAccess = await ensureReferralAccess(req.user, referral_id);
    if (!canAccess) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const result = await query(
      'INSERT INTO messages (sender_id, receiver_id, referral_id, message) VALUES ($1,$2,$3,$4) RETURNING *',
      [req.user.id, receiver_id, referral_id, message]
    );
    await audit(req.user.id, 'message.send', 'messages', { referral_id });
    return res.status(201).json({ message: result.rows[0] });
  }
);
