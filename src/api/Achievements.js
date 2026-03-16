import axios from "../util/axios.custiomzie";

const createAchievements = (id, value) => {
    const URL_API = `/v1/api/achievements/` + id;
    return axios.post(URL_API, value);
}
export {
    createAchievements,
}