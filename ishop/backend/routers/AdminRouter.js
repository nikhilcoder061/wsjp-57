const express = require('express');
const AdminController = require('../controllers/AdminController');
const AdminRouter = express.Router();


//create admin start
AdminRouter.post(
    "/create",
    (req, res) => {

        const result = new AdminController().create(req.body);
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

//create admin start
AdminRouter.post(
    "/login",
    (req, res) => {
        const result = new AdminController().login(req.body);
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


module.exports = AdminRouter;