export class GalleryError {
  sendIsNanError(res) {
    res.statusCode = 400;
    res.end(JSON.stringify({ message: 'The page number should be an integer' }));
  }

  sendFiniteError(res) {
    res.statusCode = 400;
    res.end(JSON.stringify({ message: 'The page number should be a finite integer' }));
  }

  sendWrongPageError(res, total) {
    res.statusCode = 400;
    res.end(JSON.stringify({ message: `Page should be greater than 0 and less than ${total + 1}` }));
  }

  sendAuthError(res) {
    res.statusCode = 401;
    res.end(JSON.stringify({ message: 'Auth token should be provided for authorization' }));
  }

  sendWrongTokenError(res) {
    res.statusCode = 401;
    res.end(JSON.stringify({ message: 'The auth token is not valid' }));
  }
}
