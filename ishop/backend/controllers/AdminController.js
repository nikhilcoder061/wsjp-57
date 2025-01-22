const { encryptedPassword, decryptedPassword, adminToken } = require("../helping");
const AdminModel = require("../models/AdminModel");

class AdminController {

    create(data) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const admin = await AdminModel.findOne({ email: data.email });

                    if (admin) {
                        reject(
                            {
                                msg: "Email Already registerd",
                                status: 0
                            }
                        )
                    } else {

                        const adminData = new AdminModel(
                            {
                                ...data,
                                password: encryptedPassword(data.password)
                            }
                        )

                        adminData.save().then(
                            (success) => {
                                resolve(
                                    {
                                        msg: "Admin Created",
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            (error) => {
                                console.log(error);
                                reject(
                                    {
                                        msg: "Admin not created",
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
                    const admin = await AdminModel.findOne({ email: data.email });
                    if (admin) {

                        if (data.password == decryptedPassword(admin.password)) {
                            resolve(
                                {
                                    msg: "Login Successfully",
                                    status: 1,
                                    admin: { ...admin.toJSON(), password: null },
                                    token: adminToken(admin.toJSON())
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

module.exports = AdminController;