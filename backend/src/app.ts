import * as dotenv from 'dotenv';
import express from 'express';
import { loginRouter, signUpRouter } from './login/router.js';
import { galleryRouter } from './gallery/router.js';
import { galleryHtmlRouter } from './gallery/gallery.html.router.js';
import { DbService } from './services/db-service.js';
dotenv.config();
import './login/auth.js';
import passport from 'passport';
import cors from 'cors';

const imagesDir = process.env.IMAGES_DIR;
const mongoUrl = process.env.MONGO_URL;
const hostname = process.env.HOST;
const port = process.env.PORT;

const dbService = new DbService();
dbService.startDb(imagesDir, mongoUrl);

const whitelist = ['http://127.0.0.1:3000', 'http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

const app = express();

app.use(express.json());
app.use(express.static('built'));
app.use(cors());
app.use('/', loginRouter);
app.use('/signup', signUpRouter);
app.use('/login', loginRouter);
app.use('/gallery.html', galleryHtmlRouter);
app.use('/gallery', cors(corsOptions), passport.authenticate('jwt', { session: false }), galleryRouter);
app.use('/upload', cors(corsOptions), passport.authenticate('jwt', { session: false }), galleryRouter);

app.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}/`);
});
