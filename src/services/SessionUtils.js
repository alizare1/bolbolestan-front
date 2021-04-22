


export function userExists() {
    if (localStorage.getItem('username') == null)
        return false;
    return true;
}