import { users } from '../../data/users.js';

export async function login(req, res) {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const bodyObj = JSON.parse(body);
    const user = users.find((item) => item.email == bodyObj.email);
    if (user.password === bodyObj.password) {
      res.statusCode = 200;
      res.end(JSON.stringify({ token: 'token' }));
    } else {
      res.statusCode = 401;
      res.end(JSON.stringify({ errorMessage: 'Email or password are invalid.' }));
    }
  });
}
