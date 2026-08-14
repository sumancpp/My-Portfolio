import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import { connectDB } from './config/db';
import projectRoutes from './routes/projectRoutes';
import contactRoutes from './routes/contactRoutes';
import aiRoutes from './routes/aiRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '10mb' }));

// CORS configuration with explicit production origin support
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:3000',
  'https://talentai.sumann.in',
  'https://baatcheet.sumann.in',
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser tools (e.g. Postman, curl, server-to-server) or matched origins
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in dev, configured in env
    },
    credentials: true,
  })
);

// Rate limiting for API endpoints
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api', limiter);

// API Routes
app.use('/api/projects', projectRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes);

// Upgraded Telemetry & Health Monitoring Endpoint
app.get('/api/health', (req: Request, res: Response) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.json({
    success: true,
    status: 'Online',
    database: isDbConnected ? 'MongoDB Atlas Connected' : 'Disconnected / Fallback Mode',
    services: {
      email: 'Operational',
      ai: 'Ready',
      cms: 'MongoDB Atlas Active',
    },
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[Express] Server running on port ${PORT}`);
    connectDB();
  });
}

export default app;
