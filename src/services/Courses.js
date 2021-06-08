import axios from "axios";
import { getAuthHeader } from "./SessionUtils";

export async function getCourses(filter, type) {
    const resp = await axios.get(
        `http://87.247.185.122:31008/api/courses?${filter ? "filter=" + filter + "&" : ""}${type ? 'type=' + type : ""}`,
        getAuthHeader()
    );
    return resp.data;
}

export async function getCourse(code, group) {
    const resp = await axios.get(
        `http://87.247.185.122:31008/api/courses/${code}/${group}`,
        getAuthHeader()
    );
    return resp.data;
}