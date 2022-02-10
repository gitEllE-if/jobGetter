import CryptoJS from 'crypto-js';

export function decrypt(dataHash) {
    return CryptoJS.AES.decrypt(dataHash, '0123456789').toString(CryptoJS.enc.Utf8);
}

export function encrypt(dataStr) {
    return CryptoJS.AES.encrypt(dataStr, '0123456789').toString();
}
