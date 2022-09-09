import { GalleryManager } from './gallery.manager.js';
import { UrlManipulationService } from '../services/url-manipulation.service.js';
import { BASE_URL } from '../data/constants.js';

const urlService = new UrlManipulationService();
const manager = new GalleryManager();

export async function loadGallery(): Promise<void> {
  try {
    const pageNumber: number = urlService.getPageNumberFromUrl();
    const images = await manager.api.fetchImages(pageNumber);

    manager.render.renderPagesList(images.total);
    manager.render.renderImages(images.objects);
    manager.url.addPageToUrl(pageNumber);
  } catch (e) {
    if (!(e instanceof TypeError)) alert(e);
  }
}

export async function fetchGallery(event: Event): Promise<void> {
  event.preventDefault();
  const pageNumber = Number((event.target as HTMLElement).innerText);

  const clickedPageNumber = manager.url.getClickedPageNumber(pageNumber);
  if (!clickedPageNumber) return;

  try {
    const images = await manager.api.fetchImages(clickedPageNumber);
    manager.render.renderImages(images.objects);
    manager.url.addPageToUrl(clickedPageNumber);
  } catch (e) {
    alert(e);
  }
}

export async function uploadImage(event: Event): Promise<void> {
  event.preventDefault();

  const inputFile = document.getElementById('img') as HTMLFormElement;
  const formData = new FormData();

  for (const file of inputFile.files) {
    formData.append('files', file);
  }

  const url = `${BASE_URL}/upload`;
  const accessToken = localStorage.getItem('token');

  const options = {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: accessToken,
    },
  };

  try {
    await fetch(url, options);
    location.reload();
  } catch (e) {
    alert(e);
  }
};