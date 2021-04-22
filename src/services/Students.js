import axios from "axios";



export async function getStudent(sid) {
    const resp = await axios.get('http://localhost:8080/students/' + sid);
    return resp.data;
}

export async function getStudentPlan(sid) {
    const resp = await axios.get(`http://localhost:8080/students/${sid}/plan`);
    return resp.data;
}

export async function getStudentSchedule(sid) {
    const resp = await axios.get(`http://localhost:8080/students/${sid}/schedule`);
    return resp.data;
}

export async function addCourse(sid, code, group) {
    const resp = await axios.post(
        `http://localhost:8080/students/${sid}/schedule`,
        {
            'group': group,
            'code': code
        }
    );
    return resp.data;
}

export async function resetSelection(sid) {
    const resp = await axios.delete(
        `http://localhost:8080/students/${sid}/schedule`
    );
    return resp.data;
}

export async function removeFromSchedule(sid, code, group) {
    const resp = await axios.delete(
        `http://localhost:8080/students/${sid}/schedule/${code}/${group}`
    );
    return resp.data;
}

export async function finalizeSelection(sid) {
    const resp = await axios.post(
        `http://localhost:8080/students/${sid}/schedule/finalize`
    );
    return resp.data;
}
