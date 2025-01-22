const { verifyToken } = require("../helping");

const authAdmin = (req, res, next) => {

    const authToken = req.headers.authorization;

    if (authToken) {

        if (verifyToken(authToken)) {
            next();
        } else {
            res.send(
                {
                    msg: "Invalid Token",
                    status: 0
                }
            )
        }

    } else {
        res.send(
            {
                msg: "Please provide token",
                status: 0
            }
        )
    }


}

module.exports = authAdmin;