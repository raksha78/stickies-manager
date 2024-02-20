const users = {};
function isValid(username) {
    let isValid = true;
    isValid = !!username && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
}


function addUserData(username, userData) {
    users[username] = userData;
}

function getUserData(username) {
    return users[username];
}

module.exports = {
    isValid,
    addUserData,
    getUserData
};