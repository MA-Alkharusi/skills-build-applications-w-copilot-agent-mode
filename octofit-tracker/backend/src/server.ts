import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import './config/database.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;

const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;
const frontendOrigin = codespaceName
  ? `https://${codespaceName}-5173.app.github.dev`
  : 'http://localhost:5173';

app.use(
  cors({
    origin: frontendOrigin,
  }),
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok', apiBaseUrl });
});

app.get('/api/users', (_req, res) => {
  res.status(200).json({
    message: 'Users endpoint is available',
    baseUrl: apiBaseUrl,
    users: [],
  });
});

app.get('/api/activities', (_req, res) => {
  res.status(200).json({
    message: 'Activities endpoint is available',
    baseUrl: apiBaseUrl,
    activities: [],
  });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on ${port}`);
  console.log(`API base URL: ${apiBaseUrl}`);
});
