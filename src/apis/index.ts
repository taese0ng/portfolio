import axios from 'axios';

const Axios = axios.create();
Axios.defaults.timeout = 2500;
Axios.defaults.headers.common['Content-Type'] = 'application/json';

export default Axios;
