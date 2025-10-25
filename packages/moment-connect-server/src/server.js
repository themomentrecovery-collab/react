import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './utils/env.js';
import { authRouter } from './routes/auth.js';
import { referralRouter } from './routes/referrals.js';
import { messageRouter } from './routes/messages.js';
import { reportRouter } from './routes/reports.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(morgan(config.nodeEnv === 'production' ? 'combined' : 'dev'));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/auth', authRouter);
app.use('/referrals', referralRouter);
app.use('/messages', messageRouter);
app.use('/reports', reportRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(config.port, () => {
  console.log(`Moment Connect API listening on port ${config.port}`);
});

export default app;
