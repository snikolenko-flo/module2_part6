import { log } from '../services/logger.service.js';

export class GalleryResponse {
  sendImages(res, total: number, paths: string[]) {
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        total: total,
        objects: paths,
      }),
    );
    log.info('Images were sent to the frontend.');
  }
}
