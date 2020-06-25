import express from 'express';
import authRoutes from './auth/routes';
import userRoutes from './users/routes';
import roleRoutes from './roles/routes';
import courseRoutes from './courses/routes';
import inscriptionRoutes from './inscriptions/routes';
const app = express();


app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/role', roleRoutes);
app.use('/course', courseRoutes);
app.use('/inscription', inscriptionRoutes);
export default app;