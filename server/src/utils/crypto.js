const CryptoJS = require('crypto-js');

function decrypt(dataHash) {
    return CryptoJS.AES.decrypt(dataHash, '0123456789').toString(CryptoJS.enc.Utf8);
}

function encrypt(dataStr) {
    return CryptoJS.AES.encrypt(dataStr, '0123456789').toString();
}

module.exports = { encrypt, decrypt };
