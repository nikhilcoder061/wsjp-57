const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const CategoryRouter = express.Router();
const fileUpload = require('express-fileupload');


CategoryRouter.post(
    "/create",
    fileUpload(
        {
            createParentPath: true
        }
    ),
    (req, res) => {
        const result = new CategoryController().create(req.body, req.files.imageName);
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

CategoryRouter.get(
    "/:id?",
    (req, res) => {
        const result = new CategoryController().read(req.params.id);
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

CategoryRouter.patch(
    "/status-update/:id",
    (req, res) => {
        const result = new CategoryController().statusChange(req.params.id);
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

CategoryRouter.put(
    "/update/:id",
    fileUpload(
        {
            createParentPath: true
        }
    ),
    (req, res) => {
        const result = new CategoryController().update(req.body, req.params.id, req.files?.imageName);
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

CategoryRouter.delete(
    "/delete/:id",
    (req, res) => {
        const result = new CategoryController().delete(req.params.id);
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


module.exports = CategoryRouter;