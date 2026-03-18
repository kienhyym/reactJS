import axios from "../util/axios.custiomzie";

const getKnowledge = async () => {
    const URL_API = `/v1/api/knowledge`;
    const response = await axios.get(URL_API);
    return response

}
export {
    getKnowledge,
}