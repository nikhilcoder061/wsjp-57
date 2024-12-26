const userModal = require('../modal/userModal');

class usercontroller {

    // create user logics start
    createUser(data) {
        return new Promise(
            (resolve, reject) => {
                try {
                    const user = new userModal(
                        {
                            name: data.name,
                            email: data.email,
                            phone: data.phone,
                            age: data.age,
                            password: data.password
                        }
                    )
                    user.save().then(
                        (success) => {
                            resolve(
                                {
                                    msg: "User created Successfully",
                                    status: 1
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
                } catch (error) {
                    reject(
                        {
                            msg: "Internal Server error",
                            status: 0
                        }
                    )
                }
            }
        )
    }
    // create user logics end

    // read user logics start
    readUser(id) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    let users;
                    if (id) {
                        users = await userModal.findById({ _id: id })
                    } else {
                        users = await userModal.find();
                    }

                    resolve(
                        {
                            msg: users.length + " User found",
                            status: 1,
                            users
                        }
                    )
                } catch (error) {
                    reject(
                        {
                            msg: "Internal Server error",
                            status: 0
                        }
                    )
                }
            }
        )
    }
    // read user logics end

    // delte user logics start
    deleteUser(id) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const user = await userModal.findById({ _id: id });
                    if (user) {
                        userModal.deleteOne({ _id: id }).then(
                            (success) => {
                                resolve(
                                    {
                                        msg: "User delete successfully",
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            (error) => {
                                console.log(error);
                                reject(
                                    {
                                        msg: "user not deleted",
                                        status: 0
                                    }
                                )
                            }
                        )
                    } else {
                        reject(
                            {
                                msg: "user not found",
                                status: 0
                            }
                        )
                    }
        
                } catch (error) {
                    reject(
                        {
                            msg: "Internal server error",
                            status: 0
                        }
                    )
                }
            }
        )
    }

    // delte user logics end

    // status change start

    statusChange(id){
        return new Promise(
            async (resolve, reject)=>{
                try {
                    const user = await userModal.findById({ _id: id });
                    userModal.updateOne(
                        { _id: id },
                        {
                            status: !user.status
                        }
                    ).then(
                        () => {
                            resolve(
                                {
                                    msg: "Status Change Successfully",
                                    status: 1
                                }
                            )
                        }
                    ).catch(
                        () => {
                            reject(
                                {
                                    msg: "Status not updateF",
                                    status: 0
                                }
                            )
                        }
                    )
                } catch (error) {
                    reject(
                        {
                            msg: "Internal Server error",
                            status: 0
                        }
                    )
                }
            }
        )
    }


    // status change end
}

module.exports = usercontroller;