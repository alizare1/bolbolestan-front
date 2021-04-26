import axios from "axios";

export async function getCourses(filter, type) {
    const resp = await axios.get(
        `http://localhost:8080/api/courses?${filter ? "filter=" + filter + "&" : ""}${type ? 'type=' + type : ""}`
    );
    return resp.data;
}

export async function getCourse(code, group) {
    const resp = await axios.get(
        `http://localhost:8080/api/courses/${code}/${group}`
    );
    return resp.data;
}