import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler.js';
import AppError from './utils/AppError.js';

import tourRoutes from './routes/tourRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import destinationRoutes from './routes/destinationRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

const app = express();

// Trust reverse proxy (cPanel / Nginx / Abasthan proxy)
app.set('trust proxy', 1);

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

const limiter = rateLimit({
  max: Infinity,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});

app.use('/api', limiter);

app.use(cors({
  origin: [
    'http://localhost:4200',
    'https://management-squeaky-fish.abasthan.app',
    'https://kemetica.vercel.app',
    'https://pants-similar-sea-lion.abasthan.app',
    'https://www.kemeticatours.com'
  ],
  credentials: true,
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../public')));
app.use('/images', express.static(path.join(__dirname, '../images')));
app.use('/icons', express.static(path.join(__dirname, '../icons')));

app.use('/api/v1/tours', tourRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/destinations', destinationRoutes);
app.use('/api/v1/tours/:id/reviews', reviewRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/inquiries', inquiryRoutes);
app.use('/api/v1/admin/categories', categoryRoutes);
app.use('/api/v1/upload', uploadRoutes);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

export default app;