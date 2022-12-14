import * as config from '../config/api-config'
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

//criar contato
export const postContact = (data) => {
    return axios.post(`${config.getApiContatos()}/contatos`, data)
    .then(
        response => {
            return response.data;
        }
    )
}

//Consultar Contato
export const getAllContatos = () => {
    return axios.get(`${config.getApiContatos()}/contatos`)
    .then(
        response => {
            return response.data;
        }
    )
}

//Consulta de contato por Id
export const getContatoById = (id) => {
    return axios.get(`${config.getApiContatos()}/contatos/${id}`)
    .then(
        response => {
            return response.data;
        }
    )
}

//Função para excluir um contato
export const deleteContato = (id) => {
    return axios.delete(`${config.getApiContatos()}/contatos/${id}`)
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