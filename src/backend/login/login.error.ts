export class LoginError {
  sendLoginError(res) {
    res.statusCode = 401;
    res.end(JSON.stringify({ errorMessage: 'Email or password are invalid.' }));
  }
}
