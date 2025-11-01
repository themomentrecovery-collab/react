# Hub User Dashboard Fixture

This fixture contains a static implementation of the Hub User Dashboard, including
persistent layout components and example pages for the workflows described in the
product requirements. The fixture uses Vite with React and TypeScript to keep the
implementation lightweight and focused on UI behaviors.

## Getting Started

```bash
yarn
yarn dev
```

The development server runs on port `5174` by default. Navigate to
`http://localhost:5174` to explore the dashboard experience.

## Available Pages

The dashboard includes the following routes:

- `/home` – homepage with quick stats and unread alerts table
- `/alerts` – full alerts management console
- `/referral-pool` – unclaimed referrals with claim and details interactions
- `/my-referrals` – pending placement, intake, active, and completed referrals
- `/matching` – matching workflow with referral and facility detail modals
- `/hold-queue` – referrals queued for future placement
- `/messages` – two-panel messaging center with referral context
- `/performance` – stat cards and comparative bar charts
- `/preferences` – profile, account information, and notification toggles
- `/support` – quick access to support resources

Quick actions, navigation, header, and footer elements persist across every page to
mirror the specified dashboard shell.
