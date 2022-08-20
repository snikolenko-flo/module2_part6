import express from 'express';
import { sendFile } from '../services/file.service.js';

export const galleryHtmlRouter = express.Router();
galleryHtmlRouter.get('/', (req, res) => sendFile(req, res, './built/frontend/html/gallery.html', 'text/html'));