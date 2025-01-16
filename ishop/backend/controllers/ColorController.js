const ColorModel = require("../models/ColorModel");

class ColorController {

    create(data) {
        return new Promise(
            (resolve, reject) => {
                try {

                    const color = new ColorModel(
                        {
                            name: data.name,
                            colorCode: data.colorCode,
                        }
                    )
                    color.save().then(
                        (success) => {
                            resolve(
                                {
                                    msg: "Color is created",
                                    status: 1
                                }
                            )
                        }
                    ).catch(
                        (error) => {
                            reject(
                                {
                                    msg: "Color is not created",
                                    status: 0
                                }
                            )
                        }
                    )
                } catch (error) {
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

    read(id) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    let color;
                    if (id) {
                        color = await ColorModel.findById(id);
                    } else {
                        color = await ColorModel.find();
                    }

                    resolve(
                        {
                            msg: "Color found",
                            status: 1,
                            color
                        }
                    )

                } catch (error) {
                    reject(
                        {
                            msg: "Internal Server error",
                            status: 0,
                        }
                    )
                }
            }
        )
    }

    statusChange(id) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    const color = await ColorModel.findById(id);
                    ColorModel.updateOne(
                        {
                            _id: id
                        },
                        {
                            $set: {
                                status: !color.status
                            }
                        }
                    ).then(
                        () => {
                            resolve(
                                {
                                    msg: "Status Update successfully",
                                    status: 1
                                }
                            )
                        }
                    ).catch(
                        () => {
                            reject(
                                {
                                    msg: "Status not Update",
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

    delete(id) {
        return new Promise(
            (resolve, reject) => {
                try {
                    ColorModel.deleteOne({ _id: id }).then(
                        (success) => {
                            resolve(
                                {
                                    msg: "Color Deleted Successfully",
                                    status: 1
                                }
                            )
                        }
                    ).catch(
                        (error) => {
                            reject(
                                {
                                    msg: "Color not Deleted",
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

    update(data, id) {
        return new Promise(
            async (resolve, reject) => {
                try {

                    ColorModel.updateOne(
                        { _id: id },
                        {
                            $set: {
                                name: data.name,
                                slug: data.colorCode
                            }
                        }
                    ).then(
                        () => {
                            resolve(
                                {
                                    msg: "Color Update successfully",
                                    status: 1
                                }
                            )
                        }
                    ).catch(
                        () => {
                            reject(
                                {
                                    msg: "Color not Update",
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
}

module.exports = ColorController;