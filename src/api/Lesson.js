import axios from "../util/axios.custiomzie";

const getLessonList = () => {
    const URL_API = `/v1/api/lectures`;
    return axios.get(URL_API);
}

const getLessonDetail = (id) => {
    const URL_API = `/v1/api/lecture/` + id;
    return axios.get(URL_API);
}

export {
    getLessonList,
    getLessonDetail
}