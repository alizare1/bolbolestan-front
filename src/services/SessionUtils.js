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

export function saveToken(token) {
    localStorage.setItem('token', token);
}

export function getToken() {
    return localStorage.getItem('token');
}

export function getAuthHeader() {
    let token = getToken();
    if (token == null)
        return {};
    else
        return {'headers': {'Authorization': `Bearer ${token}`}};
}