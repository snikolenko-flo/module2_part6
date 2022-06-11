import * as http from 'http';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.url === '/login') {
    res.end(JSON.stringify({ token: 'token' }));
  } else if (req.url === '/gallery?page=1') {
    res.end(
      JSON.stringify({
        errorMessage: 'errorMessage',
        message: 'message',
        total: 2,
        objects: 'url/blablabla',
      }),
    );
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
