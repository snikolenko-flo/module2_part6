import { log } from '../services/logger.service.js';

export class GalleryError {
  sendIsNanError(res) {
    log.error('The page number is not an integer');
    res.statusCode = 400;
    res.end(JSON.stringify({ message: 'The page number should be an integer' }));
  }

  sendFiniteError(res) {
    log.error('The page number is not a finite integer');
    res.statusCode = 400;
    res.end(JSON.stringify({ message: 'The page number should be a finite integer' }));
  }

  sendWrongPageError(res, total) {
    log.error(`Page is greater than 0 or less than ${total + 1}`);
    res.statusCode = 400;
    res.end(JSON.stringify({ message: `Page should be greater than 0 and less than ${total + 1}` }));
  }
}
