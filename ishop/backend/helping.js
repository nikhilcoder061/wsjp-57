const generateUniquImageName = (imageName) => {
    return Math.floor(Math.random() * 1000) + new Date().getTime() + imageName
}

module.exports = generateUniquImageName