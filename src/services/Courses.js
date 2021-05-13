import axios from "axios";
import { getAuthHeader } from "./SessionUtils";

export async function getCourses(filter, type) {
    const resp = await axios.get(
        `http://localhost:8080/api/courses?${filter ? "filter=" + filter + "&" : ""}${type ? 'type=' + type : ""}`,
        getAuthHeader()
    );
    return resp.data;
}

export async function getCourse(code, group) {
    const resp = await axios.get(
        `http://localhost:8080/api/courses/${code}/${group}`,
        getAuthHeader()
    );
    return resp.data;
}