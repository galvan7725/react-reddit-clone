import axios from 'axios';
import { getJWT } from './authService';
import {subredditData} from '../interfaces';

export const getSubreddits = () : Promise<any> => {
    const { authenticationToken } = getJWT();
    return axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_API_HOST}/subreddit`,
        headers: {
            'Authorization': `Bearer ${authenticationToken}`
        }
    }).then((response) => {
        return response.data ? response.data : response.status;
    }).catch((error) => { return error.response.data });
}

export const createSubreddit = (subredditData: subredditData) : Promise<any> =>{
    const { authenticationToken } = getJWT();
    return axios({
        method: 'POST',
        url: `${process.env.NEXT_PUBLIC_API_HOST}/subreddit`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authenticationToken}`
        },
        data: subredditData
    }).then((response) => {
        return response.data ? response.data : response.status;
    }).catch((error) => { return error.response.data });
}

export const getSubredditDescription = (subredditId: string | string[]): Promise<any> => {
    const { authenticationToken } = getJWT();
    return axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_API_HOST}/subreddit/${subredditId}`,
        headers: {
            'Authorization': `Bearer ${authenticationToken}`
        }
    }).then((response) => {
        return response.data ? response.data : response.status;
    }).catch((error) => { return error.response.data });
}