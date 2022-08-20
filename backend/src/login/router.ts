import { login } from './handler.js';
import express from 'express';
import { sendFile } from '../services/file.service.js';

export const loginRouter = express.Router();
loginRouter.get('/', (req, res) => sendFile(req, res, './built/frontend/html/login.html', 'text/html'));
loginRouter.post('/login', login);






