import * as bcrypt from 'bcrypt';
import moment from 'moment';

/**
 * Encrypts a string using bcrypt hashing.
 * 
 * @param {string} s - The string to be encrypted.
 * @returns {Promise<string>} - The encrypted string.
 */
export const encryptString = async (s: string) => {
    const encryptedString = await bcrypt.hash(s, 8);
    return encryptedString;
};

export const generateOTP = function(){
    const numbers = "0123456789";
    const random = Math.random;
    let strRandom = "";
    
    for (let i = 0; i < 5; i++) {
        const temp = Math.floor(random() * numbers.length);
        strRandom += numbers[temp];
    }
    
    return strRandom.slice(0, 6);
}

/**
 * Compares a plain string with a bcrypt hash to determine if they match.
 * 
 * @param {string} s - The plain string to be compared.
 * @param {string} hash - The bcrypt hash to compare against.
 * @returns {Promise<boolean>} - A promise that resolves to true if the comparison is successful, otherwise false.
 */
export const bcryptCompare = async (s, hash) => {
    return await bcrypt.compare(s, hash);
};

export const SERVER_CONST = {
    JWTSECRET: 'SecretKeyOfPMS-SECRET',
    ACCESS_TOKEN_EXPIRY_TIME_SECONDS: 1 * 8 * 60 * 60, // 8 hours
    REFRESH_TOKEN_EXPIRY_TIME_SECONDS: 5 * 7 * 24 * 60 * 60, // one week
};

export const checkValidDate = function (value) {
    if (!moment(value, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {
        return false;
    }
    return true;
};