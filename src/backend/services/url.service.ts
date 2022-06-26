export function getUrl(req, base) {
  return new URL(req.url, base);
}

export async function getOptions(req, res) {
  res.statusCode = 200;
  res.end();
}
