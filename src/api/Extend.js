import axios from "../util/axios.custiomzie";

const getExtend = async () => {
    const URL_API = `/v1/api/extend`;
    const response = await axios.get(URL_API);
    return response
}
export {
    getExtend,
}