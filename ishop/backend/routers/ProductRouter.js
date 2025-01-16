const express = require('express');
const ProductController = require('../controllers/ProductController');
const ProductRouter = express.Router();
const fileUpload = require('express-fileupload');


ProductRouter.get(
    "/:id?",
    (req, res) => {
        const result = new ProductController().read(req.params.id);
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

ProductRouter.post(
    "/create",
    fileUpload(
        {
            createParentPath: true
        }
    ),
    (req, res) => {

        const result = new ProductController().create(req.body, req.files?.main_image);
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

ProductRouter.patch(
    "/status-update/:id",
    (req, res) => {

        const result = new ProductController().statusChange(req.params.id, req.body.flag);
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

ProductRouter.post(
    "/multiple-image/:id",
    fileUpload(
        {
            createParentPath: true
        }
    ),
    (req, res) => {
        const result = new ProductController().multipleImage(req.params.id, req.files?.other_image);
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

ProductRouter.delete(
    "/delete/:id",
    (req, res) => {
        const result = new ProductController().delete(req.params.id);
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

ProductRouter.put(
    "/update/:id",
    fileUpload(
        {
            createParentPath: true
        }
    ),
    (req, res) => {
        const result = new ProductController().update(req.body, req.params.id, req.files?.main_image);
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

module.exports = ProductRouter;