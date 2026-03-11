import axios from "../util/axios.custiomzie";

const getExtend= () => {
    const URL_API = `/v1/api/extend`;
    return axios.get(URL_API);
}
export {
    getExtend,
}