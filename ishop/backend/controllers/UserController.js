const { encryptedPassword, decryptedPassword, adminToken } = require("../helping");
const CartModel = require("../models/CartModel");
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

    moveToCart(userId, data) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    if (data) {

                        const allPromise = data.cart.map(
                            async (cartItem) => {
                                const existingProduct = await CartModel.findOne({ user_id: userId, product_id: cartItem.product_id }) ?? null;
                                if (existingProduct) {
                                    // already product added
                                    console.log('in update');
                                    await CartModel.updateOne(
                                        { _id: existingProduct._id },
                                        {
                                            $inc: {
                                                qty: Number(cartItem.qty)
                                            }
                                        }
                                    )
                                } else {
                                    // new product add
                                    console.log('create');
                                    await new CartModel(
                                        {
                                            user_id: userId,
                                            product_id: cartItem.product_id,
                                            qty: Number(cartItem.qty)
                                        }
                                    ).save().then(
                                        (success) => {
                                            console.log(success);
                                        }
                                    ).catch(
                                        (error) => {
                                            console.log(error);
                                        }
                                    )
                                }

                            }
                        )

                        await Promise.all(allPromise);

                        const latestCart = await CartModel.find({ user_id: userId }).populate('product_id', '_id original_price final_price');;
                        resolve({
                            latestCart,
                            status: 1,
                            msg: "Move to DB successful"
                        });


                    } else {
                        console.log("cart Data Null");
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