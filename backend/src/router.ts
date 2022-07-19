import * as fs from 'fs';

export async function frontendRouter(req, res, path) {
  console.log(`frontend router. path: ${path}`);
  await sendJSFile(req, res, path);
}

export async function backendRouter(req, res, path) {
  console.log(`backend router. path: ${path}`);
  const decodedURI = decodeURI(path);
  await sendJSFile(req, res, decodedURI);
}

async function sendJSFile(req, res, path) {
  fs.readFile(`./built${path}`, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.setHeader('Content-Type', 'application/javascript');
    if (path.includes('css')) res.setHeader('Content-Type', 'text/css');
    res.writeHead(200);
    res.end(data);
  });
}
