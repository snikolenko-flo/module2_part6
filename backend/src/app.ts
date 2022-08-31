import { HOST, PORT } from './data/constants.js';
import express from 'express';
import { loginRouter } from './login/router.js';
import { galleryRouter } from './gallery/router.js';
import { galleryHtmlRouter } from './gallery/gallery.html.router.js';
import { checkAuthorization } from './services/auth.service.js';
import multer from 'multer';

const userFolder = './built/backend/images/uploaded_by_user/';

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, userFolder);
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const hostname = HOST;
const port = PORT;

const app = express();

app.use(express.static('built'));
app.use('/', loginRouter);
app.use('/login', loginRouter);
app.use('/gallery.html', galleryHtmlRouter);
app.use('/gallery', checkAuthorization, galleryRouter);
app.post('/upload', upload.single('img'), (req, res) => {
  const file = req.file;
  if (!file) {
    res.status = 400;
    res.send({error: 'Upload a file please'});
    res.end();
  }
  res.status(200);
  res.end();
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});