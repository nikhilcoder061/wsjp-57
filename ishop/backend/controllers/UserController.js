const { encryptedPassword, decryptedPassword, adminToken } = require("../helping");
const UserModel = require("../models/UserModel");

class UserController {

    create(data) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const user = await UserModel.findOne({ email: data.email });

                    if (user) {
                        reject(
                            {
                                msg: "Email Already registerd",
                                status: 0
                            }
                        )
                    } else {

                        const userData = new UserModel(
                            {
                                ...data,
                                password: encryptedPassword(data.password)
                            }
                        )

                        userData.save().then(
                            (success) => {
                                resolve(
                                    {
                                        msg: "User Created",
                                        status: 1,
                                        user: { ...userData.toJSON(), password: null },
                                        token: adminToken(userData.toJSON())
                                    }
                                )
                            }
                        ).catch(
                            (error) => {
                                console.log(error);
                                reject(
                                    {
                                        msg: "User not created",
                                        status: 0
                                    }
                                )
                            }
                        )
                    }


                } catch (error) {
                    console.log(error);
                    reject(
                        {
                            msg: "Internal Server Error",
                            status: 0
                        }
                    )
                }
            }
        )
    }

    login(data) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const user = await UserModel.findOne({ email: data.email });
                    if (user) {

                        if (data.password == decryptedPassword(user.password)) {
                            resolve(
                                {
                                    msg: "Login Successfully",
                                    status: 1,
                                    user: { ...user.toJSON(), password: null },
                                    token: adminToken(user.toJSON())
                                }
                            )
                        } else {
                            reject(
                                {
                                    msg: "Password not correct",
                                    status: 0
                                }
                            )
                        }


                    } else {
                        reject(
                            {
                                msg: "Email not found",
                                status: 0
                            }
                        )
                    }

                } catch (error) {
                    console.log(error);
                    reject(
                        {
                            msg: "Internal Server Error",
                            status: 0
                        }
                    )
                }
            }
        )
    }


}

module.exports = UserController;