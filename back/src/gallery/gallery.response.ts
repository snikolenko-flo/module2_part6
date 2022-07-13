export class GalleryResponse {
  sendImages(res, total: number, paths: string[]) {
    res.statusCode = 200;
    res.end(
      JSON.stringify({
        total: total,
        objects: paths,
      }),
    );
  }
}
