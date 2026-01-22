import { query } from '../db/pool.js';

export async function audit(userId, action, resource, metadata = {}) {
  try {
    await query(
      'INSERT INTO audit_logs (user_id, action, resource, metadata) VALUES ($1,$2,$3,$4)',
      [userId ?? null, action, resource, metadata]
    );
  } catch (error) {
    console.error('Failed to write audit log', error);
  }
}
