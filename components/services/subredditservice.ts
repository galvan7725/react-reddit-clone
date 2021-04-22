import axios from 'axios';
import { getJWT } from './authService';

const BASE_URL = 'http://localhost:8080/api';


export const getSubreddits = () : Promise<any> => {
    const { authenticationToken } = getJWT();
    return axios({
        method: 'GET',
        url: `${BASE_URL}/subreddit`,
        headers: {
            'Authorization': `Bearer ${authenticationToken}`
        }
    }).then((response) => {
        return response.data ? response.data : response.status;
    }).catch((error) => { return error.response.data });
}