import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

import hospitalRoutes from './routes/hospitalRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import ambulanceRoutes from './routes/ambulanceRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Logging Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// CORS configuration (allow local dev + production Render domains)
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
  : ['http://localhost:5173', 'http://localhost:3000', 'https://rapidcare.onrender.com'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.indexOf(origin) !== -1 ||
        origin.endsWith('.onrender.com') ||
        origin.endsWith('.vercel.app')
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in dev mode for hackathon / SIH setup
    },
    credentials: true,
  })
);

// 🩺 Render Liveness & Readiness Health Probe
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'rapidcare-backend-api',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/ambulances', ambulanceRoutes);

// Root Welcome Endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'RapidCare Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      nearbyHospitals: '/api/hospitals/nearby?lat={lat}&lng={lng}&radius=50',
      ambulances: '/api/ambulances',
      bookings: '/api/bookings',
    },
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use((err, req, res, _next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred.',
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 RapidCare API server listening on http://localhost:${PORT}`);
  console.log(`🩺 Health check available at http://localhost:${PORT}/health`);
});
