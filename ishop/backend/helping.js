require('dotenv').config()
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRET_KEY);



const generateUniquImageName = (imageName) => {
    return Math.floor(Math.random() * 1000) + new Date().getTime() + imageName
}

const encryptedPassword = (value) => {
    return cryptr.encrypt(value)
}

const decryptedPassword = (value) => {
    return cryptr.decrypt(value)
}

module.exports = { generateUniquImageName, encryptedPassword, decryptedPassword }