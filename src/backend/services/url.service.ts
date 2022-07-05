import { FRONT_URL } from '../data/constants.js';

export class UrlService {
  getUrlProperties(req) {
    const url: URL = this.getUrl(req, FRONT_URL);
    const path = url.pathname;
    const method = req.method;

    return {
      path: path,
      method: method,
    };
  }

  getUrl(req, base: string): URL {
    return new URL(req.url, base);
  }

  getPageNumber(req) {
    const url: URL = this.getUrl(req, FRONT_URL);
    const page = url.searchParams.get('page');
    return parseInt(page);
  }
}
