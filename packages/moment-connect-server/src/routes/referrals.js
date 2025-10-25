import express from 'express';
import { body, param, validationResult } from 'express-validator';
import { authenticate, authorize } from '../middleware/auth.js';
import { query } from '../db/pool.js';
import { encrypt, decrypt } from '../services/encryption.js';
import { audit } from '../utils/audit.js';

export const referralRouter = express.Router();

referralRouter.use(authenticate);

referralRouter.post(
  '/',
  authorize('agency'),
  [
    body('client_name').isString().isLength({ min: 2 }),
    body('asam_level').isString().isLength({ min: 2 }),
    body('consent_document').isString(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { client_name, asam_level, consent_document } = req.body;
    const { cipher, iv, authTag } = encrypt(consent_document);
    const result = await query(
      'INSERT INTO referrals (agency_id, client_name, asam_level, consent_document, consent_iv, consent_auth_tag, status) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
      [req.user.id, client_name, asam_level, cipher, iv, authTag, 'submitted']
    );
    await audit(req.user.id, 'referral.create', 'referrals', { referralId: result.rows[0].id });
    return res.status(201).json({ referral: mapReferral(result.rows[0], req.user) });
  }
);

referralRouter.get('/', async (req, res) => {
  let result;
  if (req.user.role === 'agency') {
    result = await query('SELECT * FROM referrals WHERE agency_id=$1 ORDER BY created_at DESC', [req.user.id]);
  } else if (req.user.role === 'facility') {
    result = await query('SELECT * FROM referrals WHERE facility_id=$1 ORDER BY created_at DESC', [req.user.id]);
  } else {
    result = await query('SELECT * FROM referrals ORDER BY created_at DESC');
  }
  const referrals = result.rows.map(row => mapReferral(row, req.user));
  return res.json({ referrals });
});

referralRouter.post(
  '/:id/assign',
  authorize('admin'),
  [param('id').isUUID(), body('facility_id').isUUID()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const { facility_id } = req.body;
    await query('UPDATE referrals SET facility_id=$1, status=$2, updated_at=NOW() WHERE id=$3', [
      facility_id,
      'assigned',
      id,
    ]);
    await audit(req.user.id, 'referral.assign', 'referrals', { referralId: id, facility_id });
    return res.json({ message: 'Referral assigned' });
  }
);

referralRouter.post(
  '/:id/respond',
  authorize('facility'),
  [param('id').isUUID(), body('status').isIn(['accepted', 'denied', 'completed'])],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { id } = req.params;
    const { status, bed_days_reserved } = req.body;
    await query(
      'UPDATE referrals SET status=$1, bed_days_reserved=COALESCE($2, bed_days_reserved), updated_at=NOW() WHERE id=$3 AND facility_id=$4',
      [status, bed_days_reserved ?? null, id, req.user.id]
    );
    await audit(req.user.id, 'referral.respond', 'referrals', { referralId: id, status });
    return res.json({ message: 'Referral updated' });
  }
);

referralRouter.get('/:id', [param('id').isUUID()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.params;
  const result = await query('SELECT * FROM referrals WHERE id=$1', [id]);
  if (result.rowCount === 0) {
    return res.status(404).json({ error: 'Referral not found' });
  }
  const referral = mapReferral(result.rows[0], req.user);
  if (
    req.user.role === 'agency' && referral.agency_id !== req.user.id && referral.facility_id !== req.user.id
  ) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  if (req.user.role === 'facility' && referral.facility_id !== req.user.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  return res.json({ referral });
});

function mapReferral(row, user) {
  let consent_document = null;
  const canViewConsent =
    (user.role === 'agency' && row.agency_id === user.id) ||
    user.role === 'admin' ||
    (user.role === 'facility' && row.facility_id === user.id);

  if (canViewConsent && row.consent_document && row.consent_iv && row.consent_auth_tag) {
    try {
      consent_document = decrypt(row.consent_document, row.consent_iv, row.consent_auth_tag);
    } catch (error) {
      consent_document = null;
    }
  }
  return {
    id: row.id,
    agency_id: row.agency_id,
    facility_id: row.facility_id,
    client_name: row.client_name,
    asam_level: row.asam_level,
    status: row.status,
    created_at: row.created_at,
    updated_at: row.updated_at,
    bed_days_reserved: row.bed_days_reserved ?? 0,
    consent_document,
  };
}
