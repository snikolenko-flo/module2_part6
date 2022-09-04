import { HOST, PORT } from './data/constants.js';
import express from 'express';
import { loginRouter } from './login/router.js';
import { galleryRouter } from './gallery/router.js';
import { galleryHtmlRouter } from './gallery/gallery.html.router.js';
import { checkAuthorization } from './services/auth.service.js';

const hostname = HOST;
const port = PORT;

const app = express();

app.use(express.static('built'));

app.use('/', loginRouter);
app.use('/login', loginRouter);
app.use('/gallery.html', galleryHtmlRouter);
app.use('/gallery', checkAuthorization, galleryRouter);
app.use('/upload', checkAuthorization, galleryRouter);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});