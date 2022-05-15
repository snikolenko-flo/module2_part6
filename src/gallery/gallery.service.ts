export class GalleryService {
    wrapUrlsInHtml(urlsList: URL[]) {
        let images: string = '';

        urlsList.forEach(function(url) {
            images += `<div class="gallery">
                           <img src="${url}">
                       </div>`;
        });

        return images;
    }

    wrapNumbersInHtml(totalPages: number) {
        let pagesList: string = '';

        for (let i=1; i<=totalPages; i++) {
            pagesList += `<a href="">
                              <li>${i}</li>
                          </a>`;
        }

        return pagesList;
    }

    redirectToPage(pageNumber: number) {
        window.location.href = `../gallery.html?page=${pageNumber}`;
    }
}