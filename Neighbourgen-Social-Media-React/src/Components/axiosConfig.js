import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});

instance.interceptors.request.use(function (config) {
    var token = JSON.parse(localStorage.getItem('user'));
    var atoken = token.access_token;
    config.headers.Authorization =  atoken;
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default instance;