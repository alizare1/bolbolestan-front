export function userExists() {
    if (localStorage.getItem('username') == null)
        return false;
    return true;
}

export function getUsername() {
    return localStorage.getItem('username');
}

export function saveUsername(username) {
    localStorage.setItem('username', username);
}