require('dotenv').config();
var jwt = require('jsonwebtoken');


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

const adminToken = (data) => {
    return jwt.sign(data, process.env.SECRET_KEY)
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY)
}



module.exports = { adminToken, verifyToken, generateUniquImageName, encryptedPassword, decryptedPassword }