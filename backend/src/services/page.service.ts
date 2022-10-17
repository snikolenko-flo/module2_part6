import { Request, Response } from 'express';
import { log } from '../helper/logger.js';
import { getImagesNumber } from './db-service.js';

export class PageService {
  async getLimit(req: Request, res: Response): Promise<void> {
    const pageLimit = await getImagesNumber();
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        limit: pageLimit,
      }),
    );
    log.info('Page limit was sent to the frontend.');
  }
}
