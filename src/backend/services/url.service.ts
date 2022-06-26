import { FRONT_URL } from '../data/constants.js';

export function getUrl(req, base) {
  return new URL(req.url, base);
}

export function getPageNumber(req) {
  const url: URL = getUrl(req, FRONT_URL);
  const page = url.searchParams.get('page');
  return parseInt(page);
}
