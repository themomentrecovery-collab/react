# Moment Connect Server

Secure referral management API supporting The Moment Connect multi-role dashboard ecosystem.

## Features

- HIPAA-minded architecture with AES-256-GCM encryption for PHI documents.
- Role-based access for referral agencies, facilities, and platform administrators.
- MFA-protected authentication workflow using TOTP.
- Real-time referral lifecycle endpoints (submission, assignment, facility response).
- Secure messaging between agencies, facilities, and the admin hub.
- Audit-ready reporting endpoints for compliance insights.

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Yarn 1.x (workspaces enabled)

### Environment

Copy the sample environment file and update the secrets for your deployment:

```bash
cp packages/moment-connect-server/.env.example packages/moment-connect-server/.env
```

- `DATABASE_URL` should reference an encrypted AWS RDS PostgreSQL instance.
- `JWT_SECRET` **must** be a strong secret stored in AWS Secrets Manager.
- `AES_SECRET_KEY` is a 32-byte key used for AES-256-GCM; generate via `openssl rand -base64 32` and store securely.

### Database Migration

```bash
# Ensure DATABASE_URL is exported or present in the .env file
cd packages/moment-connect-server
yarn migrate
```

### Running Locally

```bash
cd packages/moment-connect-server
yarn start
```

The API listens on `http://localhost:4000` by default.

### Key Endpoints

| Method | Path | Description |
| ------ | ---- | ----------- |
| POST | `/auth/register` | Create a new user with MFA secret issuance. |
| POST | `/auth/login` | MFA-secured login returning a JWT. |
| POST | `/referrals` | Agency submits a new referral. |
| POST | `/referrals/:id/assign` | Admin assigns referral to facility. |
| POST | `/referrals/:id/respond` | Facility approves/denies/completes referral. |
| GET | `/reports/summary` | Administrative referral summary. |
| GET | `/reports/compliance` | Audit log aggregation for compliance tracking. |

### Production Deployment Notes

- Deploy the API on hardened AWS EC2 instances or Fargate containers with private networking.
- Enforce TLS 1.3 via AWS Application Load Balancer and ACM-managed certificates.
- Enable AWS CloudWatch for application and audit log shipping.
- Use AWS Secrets Manager for JWT, database, and encryption keys.
- Configure automatic database backups and encryption at rest (AWS RDS).
- Add WAF rules and CloudTrail logging for defense-in-depth.

## Testing MFA

Use the `/auth/register` endpoint to obtain a base32 MFA secret, then load it into an authenticator app (e.g., Authy, Google Authenticator). Supply generated tokens to `/auth/login`.

## License

Distributed under the same license as the React monorepo.
