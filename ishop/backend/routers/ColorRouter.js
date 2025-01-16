const express = require('express');
const ColorController = require('../controllers/ColorController');
const ColorRouter = express.Router();


//create color start
ColorRouter.post(
    "/create",
    (req, res) => {

        const result = new ColorController().create(req.body);
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
//create color end

//read color start
ColorRouter.get(
    "/:id?",
    (req, res) => {
        const result = new ColorController().read(req.params.id);
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
//read color end

// color status change start
ColorRouter.patch(
    "/status-update/:id",
    (req, res) => {
        const result = new ColorController().statusChange(req.params.id);
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
// color status change end

// color delete start 
ColorRouter.delete(
    "/delete/:id",
    (req, res) => {
        const result = new ColorController().delete(req.params.id);
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
// color delete end

ColorRouter.put(
    "/update/:id",
    (req, res) => {
        const result = new ColorController().update(req.body, req.params.id);
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

module.exports = ColorRouter;