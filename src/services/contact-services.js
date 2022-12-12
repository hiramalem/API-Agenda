import * as config from '../config/api-config'
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";


export const postContact = (data) => {
    return axios.post(`${config.getApiContatos()}/contatos`, data)
    .then(
        response => {
            return response.data;
        }
    )
}

axios.interceptors.request.use(

    async config =>{

        if(config.url.includes('api/contatos')){
            let content = await AsyncStorage.getItem('USER_DATA');
            let accessToken = JSON.parse(content).accessToken;
            config.headers['Authorization'] = 'Bearer ' +accessToken;

        }

        return config;

    },

    error =>{
        Promise.reject(error);
    }

)