import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import './config/database.js';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;

const codespaceName = process.env.CODESPACE_NAME;
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
  res.status(200).json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on ${port}`);
});
