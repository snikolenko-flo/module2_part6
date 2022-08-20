import { getGallery } from './handler.js';
import express from 'express';

export const galleryRouter = express.Router();
galleryRouter.get('/', getGallery);
