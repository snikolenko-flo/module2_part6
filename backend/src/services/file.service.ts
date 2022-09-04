import fs from 'fs';
import { log } from './logger.service.js';

export async function sendFile(req, res, path, contentType) {
  fs.readFile(path, function (err, data) {
    if (err) {
      log.error('Requested file was not found.');
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    log.info(`The file "${path}" was sent to the frontend.` );
    res.setHeader('Content-Type', contentType);
    res.writeHead(200);
    res.end(data);
  });
}
