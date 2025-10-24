# Control Hub Dashboard Prototype

This fixture provides a static prototype of a "control hub" style admin dashboard. It is built as a standalone HTML demo that renders a React component tree directly in the browser using CDN builds of React, React DOM, and Babel.

## Running the prototype

The prototype does not require a bundler. Any static file server can host it:

```bash
# From the repository root
npx http-server fixtures/dashboard-admin
```

Then open `http://localhost:8080` in a browser.

Alternatively, you can open `index.html` directly in a modern browser, though some browsers block local font loading without a server.

## Layout overview

The prototype demonstrates:

- A sidebar with navigation, status actions, and a hero gradient background
- A responsive main canvas with a mission summary header
- Metric, workflow, incident, and activity widgets laid out on a CSS grid
- Reusable utility tag styles for positive, warning, neutral, and informational signals

This fixture is purely visual and uses hard-coded sample data to illustrate the intended composition of a future admin experience.
