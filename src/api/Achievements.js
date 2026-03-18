import axios from "../util/axios.custiomzie";

const createAchievements = async (id, value) => {
    const URL_API = `/v1/api/achievements/` + id;
    const response = await axios.post(URL_API, value);
    return response
}
export {
    createAchievements,
}