import axios from "axios";
import { getAuthHeader } from "./SessionUtils";



export async function getStudent(sid) {
    const resp = await axios.get('http://localhost:8080/api/students/' + sid, getAuthHeader());
    return resp.data;
}

export async function getStudentPlan(sid) {
    const resp = await axios.get(`http://localhost:8080/api/students/${sid}/plan`, getAuthHeader());
    return resp.data;
}

export async function getStudentSchedule(sid) {
    const resp = await axios.get(`http://localhost:8080/api/students/${sid}/schedule`, getAuthHeader());
    return resp.data;
}

export async function addCourse(sid, code, group) {
    const resp = await axios.post(
        `http://localhost:8080/api/students/${sid}/schedule`,
        {
            'group': group,
            'code': code
        },
        getAuthHeader()
    );
    return resp.data;
}

export async function resetSelection(sid) {
    const resp = await axios.delete(
        `http://localhost:8080/api/students/${sid}/schedule`,
        getAuthHeader()
    );
    return resp.data;
}

export async function removeFromSchedule(sid, code, group) {
    const resp = await axios.delete(
        `http://localhost:8080/api/students/${sid}/schedule/${code}/${group}`,
        getAuthHeader()
    );
    return resp.data;
}

export async function finalizeSelection(sid) {
    const resp = await axios.post(
        `http://localhost:8080/api/students/${sid}/schedule/finalize`, 
        {},
        getAuthHeader()
    );
    return resp.data;
}
