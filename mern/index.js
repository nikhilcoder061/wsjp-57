const otpGenerator = require('otp-generator');

console.log(otpGenerator.generate(10, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false }));