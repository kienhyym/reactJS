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

const homeApi = async () => {
    const URL_API = `/v1/api`;
    const response = await axios.get(URL_API, "truy cập api thành công");
    console.log("response",response)
    // if (response && response.data) return response.data;
    return response
}

const getPdf = async () => {
    const URL_API = `/v1/api/pdf`;
    const response = await axios.get(URL_API);
    return response
}

export { createrUserApi, loginApi, getUsersApi, homeApi ,getPdf}