import { BASE_URL } from "../data/constants.js";
import { ImagesResponse } from "../interfaces/response";

export class GalleryAPI {
    async fetchImages(pageNumber:number): Promise<ImagesResponse> {

        const accessToken = localStorage.getItem('token');
        const url = `${BASE_URL}/gallery?page=${pageNumber}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Authorization: accessToken
            }
        });

        const result = await response.json() as ImagesResponse;

        if (response.ok) {
            return result;
        } else {
            const error = this.getError(result);
            throw Error(error);
        }
    }

    getError(response: ImagesResponse) {
        if (response.errorMessage) {
            return response.errorMessage;
        } else {
            return response.message;
        }
    }
}