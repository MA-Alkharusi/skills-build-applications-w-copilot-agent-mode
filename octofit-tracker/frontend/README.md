# Octofit Tracker Frontend

This React 19 + Vite presentation tier uses `react-router-dom` and calls the backend API on port `8000`.

## Environment Variable

Define `VITE_CODESPACE_NAME` for Codespaces URL generation.

Example in `.env.local`:

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, the frontend targets:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When `VITE_CODESPACE_NAME` is not set, the app safely falls back to:

```text
http://localhost:8000/api/[component]/
```

## Run

```bash
npm --prefix octofit-tracker/frontend run dev
```
