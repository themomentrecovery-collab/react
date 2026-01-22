# Moment Connect Client

React front-end for The Moment Connect multi-role dashboard system.

## Highlights

- Supports agency, facility, and admin personas with contextual dashboards.
- React Query for secure data fetching with automatic cache revalidation.
- Vite-powered dev server with proxying to the secure API tier.
- MFA-first login experience and token-aware API client.

## Local Development

```bash
cd packages/moment-connect-client
yarn dev
```

The client expects the Moment Connect API running at `http://localhost:4000`.

### Environment Proxy

API requests are proxied in development via `vite.config.ts`. For production, configure the reverse proxy or CDN to forward `/auth`, `/referrals`, `/messages`, and `/reports` to the backend origin.

### Deployment

- Deploy the built assets to AWS S3 + CloudFront with TLS 1.3 enabled.
- Enforce security headers (CSP, HSTS, X-Content-Type-Options) at the CDN layer.
- Integrate with AWS Cognito or Auth0 for managed MFA in production deployments.

## Scripts

- `yarn dev` – Run local dev server.
- `yarn build` – Generate production assets.
- `yarn preview` – Preview production build locally.

## Security Considerations

- All tokens are stored in memory/localStorage for demo purposes. For production, prefer httpOnly cookies and short-lived tokens.
- Configure Content Security Policy and Subresource Integrity when serving via CDN.
