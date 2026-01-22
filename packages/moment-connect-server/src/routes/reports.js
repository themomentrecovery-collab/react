import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { query } from '../db/pool.js';

export const reportRouter = express.Router();

reportRouter.use(authenticate, authorize('admin'));

reportRouter.get('/summary', async (req, res) => {
  const [referrals, facilities, agencies] = await Promise.all([
    query(
      `SELECT status, COUNT(*)::int as count
       FROM referrals
       GROUP BY status`
    ),
    query("SELECT COUNT(*)::int AS count FROM users WHERE role='facility'"),
    query("SELECT COUNT(*)::int AS count FROM users WHERE role='agency'")
  ]);

  return res.json({
    referrals: referrals.rows,
    facilities: facilities.rows[0]?.count ?? 0,
    agencies: agencies.rows[0]?.count ?? 0,
  });
});

reportRouter.get('/compliance', async (req, res) => {
  const auditResult = await query(
    `SELECT action, COUNT(*)::int as count
     FROM audit_logs
     WHERE created_at > NOW() - INTERVAL '30 days'
     GROUP BY action
     ORDER BY count DESC`
  );
  return res.json({ audit: auditResult.rows });
});
