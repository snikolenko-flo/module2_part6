export class LoginResponse {
  sendToken(req, res) {
    req.on('end', () => {
      res.statusCode = 200;
      res.end(JSON.stringify({ token: 'token' }));
    });
  }
}
