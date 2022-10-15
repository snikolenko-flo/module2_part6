import { BASE_URL } from '../data/constants.js';
import { Request } from 'express';

export class UrlService {
  getUrl(req: Request, base: string): URL {
    return new URL(req.url, base);
  }

  getPageNumber(req: Request): number {
    const url: URL = this.getUrl(req, BASE_URL);
    const page = url.searchParams.get('page');
    return parseInt(page);
  }

  getPageLimit(req: Request): number {
    const url: URL = this.getUrl(req, BASE_URL);
    const limit = url.searchParams.get('limit');
    return parseInt(limit);
  }
}
