export class UrlManipulationService {
    getPageNumberFromUrl() {
        const currentUrl = window.location.search;

        const searchParams = new URLSearchParams(currentUrl);
        const page = searchParams.get('page');
        const defaultPageNumber = 1;

        if (!page) {
            return defaultPageNumber;
        }

        const pageNumber = parseInt(page);

        if (isNaN(pageNumber)) {
            throw Error('The page number should be an integer');
        }

        if (!isFinite(pageNumber)) {
            throw Error('The page number should be a finite integer');
        }

        return pageNumber;
    }
}