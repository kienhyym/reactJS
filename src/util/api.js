import axios from "./axios.custiomzie";

const createrUserApi = (name, email, password) => {
    const URL_API = `/v1/api/register`;
    const data = {
        name,
        email,
        password
    }
    return axios.post(URL_API, data);
}


const loginApi = (email, password) => {
    const URL_API = `/v1/api/login`;
    const data = {
        email,
        password
    }
    return axios.post(URL_API, data);
}

const getUsersApi = () => {
    const URL_API = `/v1/api/user`;

    return axios.get(URL_API);
}

const homeApi = () => {
    const URL_API = `/v1/api`;

    return axios.get(URL_API, "truy cập api thành công");
}

export { createrUserApi, loginApi, getUsersApi, homeApi }