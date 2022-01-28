import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://tarashkari-panel-admin-default-rtdb.firebaseio.com/'
});

export default instance;

