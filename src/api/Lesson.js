import axios from "../util/axios.custiomzie";

const getLessonList = async () => {
    const URL_API = `/v1/api/lectures`;
    const response = await axios.get(URL_API);
    return response

}

const getLessonDetail = async (id) => {
    const URL_API = `/v1/api/lecture/` + id;
    const response = await axios.get(URL_API);
    return response
}
const getQuestionsByLecture = async (value) => {
    const URL_API = `/v1/api/lectures/${value}/questions/`;
    const response = await axios.get(URL_API);
    return response
}
const getOpenChapters = async () => {
    const URL_API = `/v1/api/chapters/open`;
    const response = await axios.get(URL_API);
    return response
}
const getOpenChaptersNoLecture = async () => {
    const URL_API = `/v1/api/chapters/open/no-lecture`;
    const response = await axios.get(URL_API);
    return response
}

const getLectureDetailAndOpenlectures = async (id) => {
    const URL_API = `/v1/api/lecture/open/lectures/`+id;
    const response = await axios.get(URL_API);
    return response
}

export {
    getLessonList,
    getLessonDetail,
    getQuestionsByLecture,
    getOpenChapters,
    getLectureDetailAndOpenlectures,
    getOpenChaptersNoLecture
}