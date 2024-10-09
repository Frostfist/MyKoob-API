import axios from 'axios';
import qs from 'qs';

/**
 * Sends a POST request to the specified URL with the given data.
 *
 * @param {string} url - The URL to send the POST request to.
 * @param {object} data - The data to be sent in the request body.
 * @returns {Promise<object>} - The response data from the request.
 */
export function post(url, data) {
    try {
        return axios.post(url, qs.stringify(data), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            timeout: 10000
        });
    } catch (error) {
        console.error('Error in POST request:', error.response ? error.response.data : error.message);
        throw error;
    }
}