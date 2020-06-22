import express from 'express';
import EmailSernderController from './controller';

const app = express();

app.post('/forgot_password', EmailSernderController.ForgotPassword);
app.post('/reset_password', EmailSernderController.ResetPassword);

export default app;

