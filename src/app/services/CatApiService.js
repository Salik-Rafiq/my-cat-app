import Configuration from '../../config';
import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = Configuration.CATAPI_KEY;

class CatApiService {


    static async searchCats(limit = 10, page = 0, order = 'asc') {
        const requestURL = `${Configuration.CATAPI_BASE}images/search/?limit=${limit}&page=${page}&order=${order}`;
        return axios.get(requestURL);
    }

    static async getSingleCat() {
        const requestURL = `${Configuration.CATAPI_BASE}images/search/`;
        return axios.get(requestURL);
    }

    static async sendCatVote(id, vote) {
        const voteData = {
            image_id: id,
            value: vote
        }
        const requestURL = `${Configuration.CATAPI_BASE}votes`;
        return axios.post(requestURL, voteData);
    }
}

export default CatApiService;