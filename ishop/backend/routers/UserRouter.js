const express = require('express');
const UserController = require('../controllers/UserController');
const UserRouter = express.Router();


//create admin start
UserRouter.post(
    "/create",
    (req, res) => {

        const result = new UserController().create(req.body);
        result.then(
            (success) => {
                res.send(success);
            }
        ).catch(
            (error) => {
                res.send(error);
            }
        )
    }
)
//create admin end

//login admin start
UserRouter.post(
    "/login",
    (req, res) => {
        const result = new UserController().login(req.body);
        result.then(
            (success) => {
                res.send(success);
            }
        ).catch(
            (error) => {
                res.send(error);
            }
        )
    }
)
//login admin end


module.exports = UserRouter;