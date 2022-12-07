import * as config from '../config/api-config'
import axios from 'axios';

export const postPassword = (data) => {
    return axios.post(`${config.getApiContatos()}/password`, data)
    .then(
        response => {
            return response.data;
        }
    )
}

