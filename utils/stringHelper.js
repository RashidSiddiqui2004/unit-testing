export function generateRandomString(length) {
    length = length ?? 0;
    let randomStr = "";
    for (let i = 0; i < length; i++) {
        const offset = Math.floor(Math.random() * 26);
        randomStr += String.fromCharCode('a'.charCodeAt(0) + offset)
    }
    return randomStr;
}