import { BASE_URL } from "../data/constants.js";

export class GalleryAPI {
    async fetchImages(pageNumber) {

        const accessToken = localStorage.getItem('token');
        const url = `${BASE_URL}/gallery?page=${pageNumber}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: accessToken
            }
        });

        const result = await response.json();

        if (response.ok) {
            return result;
        } else {
            const error = this.getError(result);
            throw Error(error);
        }
    }

    getError(response) {
        if (response.errorMessage) {
            return response.errorMessage;
        } else {
            return response.message;
        }
    }
}