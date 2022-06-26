export class GalleryResponse {
  sendImages(res, total, paths) {
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        total: total,
        objects: paths,
      }),
    );
  }
}
