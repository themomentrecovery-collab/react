# Referral Hub Prototype

This fixture provides a lightweight, self-contained prototype that demonstrates the three dashboards of the "Moment Connect" referral hub experience:

1. **Facility Dashboard** – intake-focused view for facilities that manage beds and confirmations.
2. **Agency Dashboard** – referral monitoring view for mental health agencies coordinating care.
3. **Hub Dashboard** – centralized operations view that manages facility matching and queue oversight.

The prototype is built with plain HTML, CSS, and JavaScript so it can be opened directly in a browser without a build step.

## Running the prototype

1. Navigate to this directory:

   ```bash
   cd react/fixtures/referral-hub
   ```

2. Open `index.html` in any modern browser. For example, you can use the `serve` package or Python's built-in HTTP server:

   ```bash
   npx serve .
   # or
   python3 -m http.server
   ```

3. Visit the served URL (typically http://localhost:3000 or http://localhost:8000) to explore the dashboards.

## Features

- Responsive layout that mirrors the left-hand navigation and card-driven quick actions in the reference screens.
- Dynamic dashboard switching via the sidebar buttons.
- Configurable data model for quick actions, status summaries, alerts, and task sections.
- Interactive hub matching form with sample facility recommendations, queue controls, and report downloads.

You can adapt the data inside `app.js` to experiment with different referral scenarios or extend the UI with additional dashboards.
