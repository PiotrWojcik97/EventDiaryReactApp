export function localStorageWriteJWT(token) {
    localStorage.setItem('JWT', JSON.stringify({
        token: token,
        expiration_time: _getTimestampInSeconds() + 86400
    }))
}

export function localStorageGetJWT() {
    let JWTToken = JSON.parse(localStorage.getItem('JWT'))
    if(JWTToken != undefined) {
        if(_getTimestampInSeconds() < JWTToken.expiration_time)
            return JWTToken.token
    }
    return null
}

export function isJWTValid() {
    let JWTToken = JSON.parse(localStorage.getItem('JWT'))
    if(JWTToken != undefined) {
        if(_getTimestampInSeconds() < JWTToken.expiration_time)
            return true
    }
    return false
}

export function localStorageRemoveJWT() {
    localStorage.removeItem('JWT')
}

function _getTimestampInSeconds() {
    return Math.floor(Date.now() / 1000)
}
