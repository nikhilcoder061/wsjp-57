const { generateUniquImageName } = require("../helping");
const CategoryModel = require("../models/CategoryModel");
const ProductModel = require("../models/ProductModel");

class CategoryController {

    create(data, file) {
        return new Promise(
            (resolve, reject) => {
                try {
                    const newImageName = generateUniquImageName(file.name);
                    const destination = "./Public/images/category/" + newImageName;
                    file.mv(
                        destination,
                        (error) => {
                            if (error) {
                                reject(
                                    {
                                        msg: "Category is not created due to file upload",
                                        status: 0
                                    }
                                )
                            } else {
                                const category = new CategoryModel(
                                    {
                                        name: data.name,
                                        slug: data.slug,
                                        imageName: newImageName
                                    }
                                )
                                category.save().then(
                                    (success) => {
                                        resolve(
                                            {
                                                msg: "Category is created",
                                                status: 1
                                            }
                                        )
                                    }
                                ).catch(
                                    (error) => {
                                        reject(
                                            {
                                                msg: "Category is not created",
                                                status: 0
                                            }
                                        )
                                    }
                                )
                            }
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
                    let category;
                    if (id) {
                        category = await CategoryModel.findById(id);
                        resolve(
                            {
                                msg: "Category found",
                                status: 1,
                                category
                            }
                        )
                    } else {
                        category = await CategoryModel.find();
                        const data = []

                        const allPromise = category.map(
                            async (cat) => {
                                const productCount = await ProductModel.findOne(
                                    { category_id: cat._id }
                                ).countDocuments();
                                data.push(
                                    {
                                        ...cat.toJSON(), productCount
                                    }
                                )
                            }
                        )

                        await Promise.all(allPromise);

                        resolve(
                            {
                                msg: "Category found",
                                status: 1,
                                category: data
                            }
                        )
                    }

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
                    const category = await CategoryModel.findById(id);
                    CategoryModel.updateOne(
                        {
                            _id: id
                        },
                        {
                            $set: {
                                status: !category.status
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

    update(data, id, file) {
        return new Promise(
            async (resolve, reject) => {
                try {
                    if (file) {
                        const newImageName = generateUniquImageName(file.name);
                        const destination = "./Public/images/category/" + newImageName;
                        file.mv(
                            destination,
                            (error) => {
                                if (error) {
                                    reject(
                                        {
                                            msg: "Category not Update due to image",
                                            status: 0
                                        }
                                    )
                                } else {
                                    CategoryModel.updateOne(
                                        { _id: id },
                                        {
                                            $set: {
                                                name: data.name,
                                                slug: data.slug,
                                                imageName: newImageName
                                            }
                                        }
                                    ).then(
                                        () => {
                                            resolve(
                                                {
                                                    msg: "Category Update successfully",
                                                    status: 1
                                                }
                                            )
                                        }
                                    ).catch(
                                        () => {
                                            reject(
                                                {
                                                    msg: "Category not Update",
                                                    status: 0
                                                }
                                            )
                                        }
                                    )
                                }
                            }
                        )

                    } else {
                        CategoryModel.updateOne(
                            { _id: id },
                            {
                                $set: {
                                    name: data.name,
                                    slug: data.slug
                                }
                            }
                        ).then(
                            () => {
                                resolve(
                                    {
                                        msg: "Category Update successfully",
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            () => {
                                reject(
                                    {
                                        msg: "Category not Update",
                                        status: 0
                                    }
                                )
                            }
                        )
                    }
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
                    CategoryModel.deleteOne({ _id: id }).then(
                        (success) => {
                            resolve(
                                {
                                    msg: "Category Deleted Successfully",
                                    status: 1
                                }
                            )
                        }
                    ).catch(
                        (error) => {
                            reject(
                                {
                                    msg: "Category not Deleted",
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

module.exports = CategoryController;