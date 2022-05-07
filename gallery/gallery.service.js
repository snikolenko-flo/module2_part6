export class GalleryService {
    wrapUrlsInHtml(urlsList) {
        let images = '';

        urlsList.forEach(function(url) {
            images += `<div class="gallery">
                           <img src="${url}">
                       </div>`;
        });

        return images;
    }

    wrapNumbersInHtml(totalPages) {
        let pagesList = '';

        for (let i=1; i<=totalPages; i++) {
            pagesList += `<a href="">
                              <li>${i}</li>
                          </a>`;
        }

        return pagesList;
    }

    redirectToPage(pageNumber) {
        window.location.href = `../gallery/gallery.html?page=${pageNumber}`;
    }
}