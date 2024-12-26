const express = require('express');
const userRouter = express.Router();
const userModal = require('../modal/userModal');
const usercontroller = require('../controllers/usercontroller');


// create user start 
userRouter.post(
    "/register",
    (req, res) => {
        const result = new usercontroller().createUser(req.body);
        result.then(
            (success) => {
                res.send(success)
            }
        ).catch(
            (error) => {
                res.send(error)
            }
        )

    }
)
// create user end

// login user start 

userRouter.post(
    "/login",
    async (req, res) => {
        try {
            const user = await userModal.findOne({ "email": req.body.email })
            if (user != null) {
                if (user.password == req.body.password) {
                    res.send(
                        {
                            msg: "Login Succesfully",
                            status: 1
                        }
                    )
                } else {
                    res.send(
                        {
                            msg: "Password does not match",
                            status: 0
                        }
                    )
                }
            } else {
                res.send(
                    {
                        msg: "User not found",
                        status: 0
                    }
                )
            }

        } catch (error) {
            res.send(
                {
                    msg: "Internal Server Error",
                    status: 0
                }
            )
        }
    }
)

// login user end 


// view all user start 
userRouter.get(
    "/:id?",
    (req, res) => {
        const result = new usercontroller().readUser(req.params.id);
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
// view all user end


//delete user start 
userRouter.delete(
    "/delete/:id",
    (req, res) => {
        const result = new usercontroller().deleteUser(req.params.id);

        result.then(
            (success) => {
                res.send(success)
            }
        ).catch(
            (error) => {
                res.send(error);
            }
        )
    }
)
//delete user end


// status changes start
userRouter.patch(
    "/status-change/:id",
    (req, res) => {
        const result = new usercontroller().statusChange(req.params.id);
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
// status changes end


// update user start

userRouter.put(
    "/update/:id",
    async (req, res) => {
        try {
            const id = req.params.id;
            // const user = await userModal.findById({ _id: id });
            userModal.updateOne(
                { _id: id },
                {
                    ...req.body
                }

            ).then(
                () => {
                    res.send(
                        {
                            msg: "User updated Successfully",
                            status: 1
                        }
                    )
                }
            ).catch(
                () => {
                    res.send(
                        {
                            msg: "User not updated",
                            status: 0
                        }
                    )
                }
            )
        } catch (error) {
            res.send(
                {
                    msg: "Internal Server error",
                    status: 0
                }
            )
        }

    }
)

// update user end


module.exports = userRouter;