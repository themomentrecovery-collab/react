import { Pool } from 'pg';
import { config } from '../utils/env.js';

export const pool = new Pool({
  connectionString: config.databaseUrl,
  ssl: config.nodeEnv === 'production' ? { rejectUnauthorized: false } : false,
});

pool.on('error', err => {
  console.error('Unexpected PG error', err);
});

export async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  if (config.nodeEnv !== 'test') {
    console.debug('executed query', { text, duration, rows: res.rowCount });
  }
  return res;
}
