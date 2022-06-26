export class UrlManipulationService {
  getPageNumberFromUrl(): number {
    const currentUrl: string = window.location.search;

    const searchParams: URLSearchParams = new URLSearchParams(currentUrl);
    const page: string = searchParams.get('page');
    const defaultPageNumber = 1;

    if (!page) {
      return defaultPageNumber;
    }

    const pageNumber: number = parseInt(page);

    // if (isNaN(pageNumber)) {
    //   throw Error('The page number should be an integer');
    // }
    //
    // if (!isFinite(pageNumber)) {
    //   throw Error('The page number should be a finite integer');
    // }

    return pageNumber;
  }
}
