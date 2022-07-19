import fs from 'fs';

export async function sendFile(req, res, path, contentType) {
  fs.readFile(path, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.setHeader('Content-Type', contentType);
    res.writeHead(200);
    res.end(data);
  });
}
