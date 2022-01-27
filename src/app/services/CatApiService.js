import Configuration from '../../config';
import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = Configuration.CATAPI_KEY;

class CatApiService {

    static async searchCats({ limit = 9, page = 0, order = 'asc', breedId = "" } = {}) {

        const requestURL = `${Configuration.CATAPI_BASE}images/search/?limit=${limit}&page=${page}&order=${order}&breed_id=${breedId}`;
        return axios.get(requestURL);
    }

    static async getSingleCat() {
        const requestURL = `${Configuration.CATAPI_BASE}images/search/`;
        return axios.get(requestURL);
    }

    static async sendCatVote(id, vote) {
        const voteData = {
            image_id: id,
            value: vote,
            sub_id: Configuration.subID
        }
        const requestURL = `${Configuration.CATAPI_BASE}votes`;
        return axios.post(requestURL, voteData);
    }

    static async uploadCatImage(imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        const requestURL = `${Configuration.CATAPI_BASE}images/upload`;
        return axios.post(requestURL, formData, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
    }

    static async getBreeds() {
        const requestURL = `${Configuration.CATAPI_BASE}breeds`;
        return axios.get(requestURL);
    }

    static async loadVotes() {
        const requestURL = `${Configuration.CATAPI_BASE}votes`;
        return axios.get(requestURL);
    }
}

export default CatApiService;