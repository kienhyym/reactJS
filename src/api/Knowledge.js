import axios from "../util/axios.custiomzie";

const getKnowledge = () => {
    const URL_API = `/v1/api/knowledge`;
    return axios.get(URL_API);
}
export {
    getKnowledge,
}