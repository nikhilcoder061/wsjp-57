const ProductModel = require("../models/ProductModel");
const CategoryModel = require("../models/CategoryModel");
const { generateUniquImageName } = require("../helping");

class ProductController {

    read(id, query) {
        return new Promise(
            async (resolve, reject) => {
                try {

                    const filterQuery = {}
                    console.log(query);
                    if (query.categorySlug != 'null') {
                        const category = await CategoryModel.findOne(
                            {
                                slug: query.categorySlug
                            }
                        )
                        filterQuery.category_id = category._id
                    }

                    if (query.product_color != 'null') {
                        filterQuery.colors = query.product_color
                    }

                    let product;
                    if (id) {
                        product = await ProductModel.findById(id);
                    } else {
                        product = await ProductModel.find(filterQuery).populate(["category_id", "colors"]).limit(query.limit);
                    }

                    resolve(
                        {
                            msg: "Product found",
                            status: 1,
                            product
                        }
                    )

                } catch (error) {
                    console.log(error);
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

    create(data, file) {
        return new Promise(
            (resolve, reject) => {
                try {
                    const newImageName = generateUniquImageName(file.name);
                    const destination = "./Public/images/product/" + newImageName;
                    file.mv(
                        destination,
                        (error) => {
                            if (error) {
                                console.log(error);
                                reject(
                                    {
                                        msg: "Product is not created due to file upload",
                                        status: 0
                                    }
                                )
                            } else {
                                const product = new ProductModel(
                                    {
                                        ...data,
                                        colors: JSON.parse(data.colors),
                                        main_image: newImageName
                                    }
                                )
                                product.save().then(
                                    (success) => {
                                        resolve(
                                            {
                                                msg: "Product is created",
                                                status: 1
                                            }
                                        )
                                    }
                                ).catch(
                                    (error) => {
                                        console.log(error);
                                        reject(
                                            {
                                                msg: "Product is not created",
                                                status: 0
                                            }
                                        )
                                    }
                                )
                            }
                        }
                    )

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

    statusChange(id, flag) {
        return new Promise(
            async (resolve, reject) => {
                try {

                    let productStatus = {};

                    const product = await ProductModel.findById(id);

                    if (flag == 1) {
                        productStatus.stock = !product.stock
                    } else if (flag == 2) {
                        productStatus.top_selling = !product.top_selling
                    } else if (flag == 3) {
                        productStatus.status = !product.status
                    } else {
                        reject(
                            {
                                msg: "Status not Update",
                                status: 0
                            }
                        )
                    }

                    ProductModel.updateOne(
                        {
                            _id: id
                        },
                        {
                            $set: {
                                ...productStatus
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

    multipleImage(id, allImages) {
        return new Promise(
            async (resolve, reject) => {
                try {

                    const product = await ProductModel.findById(id);

                    if (product) {
                        const currentImages = product.other_image ?? [];
                        const allNewImage = Array.isArray(allImages) ? allImages : [allImages];
                        for (let image of allNewImage) {
                            let newImageName = generateUniquImageName(image.name);
                            currentImages.push(newImageName);
                            const destination = "./Public/images/product/" + newImageName;
                            image.mv(destination)
                        }


                        ProductModel.updateOne(
                            {
                                _id: id
                            },
                            {
                                $set: {
                                    other_image: currentImages
                                }
                            }
                        ).then(
                            () => {
                                resolve(
                                    {
                                        msg: "Images Uploaded",
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            () => {
                                reject(
                                    {
                                        msg: "Images not Uploaded",
                                        status: 0
                                    }
                                )
                            }
                        )

                    } else {
                        reject(
                            {
                                msg: "Product not Found",
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

    delete(id) {
        return new Promise(
            (resolve, reject) => {
                try {
                    ProductModel.deleteOne({ _id: id }).then(
                        (success) => {
                            resolve(
                                {
                                    msg: "Product Deleted Successfully",
                                    status: 1
                                }
                            )
                        }
                    ).catch(
                        (error) => {
                            reject(
                                {
                                    msg: "Product not Deleted",
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
                    console.log(data);

                    if (file != null) {
                        const newImageName = generateUniquImageName(file.name);
                        const destination = "./Public/images/product/" + newImageName;
                        file.mv(
                            destination,
                            (error) => {
                                if (error) {
                                    reject(
                                        {
                                            msg: "Product not Update due to image",
                                            status: 0
                                        }
                                    )
                                } else {
                                    ProductModel.updateOne(
                                        { _id: id },
                                        {
                                            $set: {
                                                ...data,
                                                colors: JSON.parse(data.colors),
                                                main_image: newImageName
                                            }
                                        }
                                    ).then(
                                        () => {
                                            resolve(
                                                {
                                                    msg: "Product Update successfully",
                                                    status: 1
                                                }
                                            )
                                        }
                                    ).catch(
                                        (error) => {
                                            console.log(error);
                                            reject(
                                                {
                                                    msg: "Product not Update",
                                                    status: 0
                                                }
                                            )
                                        }
                                    )
                                }
                            }
                        )

                    } else {
                        ProductModel.updateOne(
                            { _id: id },
                            {
                                $set: {
                                    ...data,
                                    colors: JSON.parse(data.colors),
                                }
                            }
                        ).then(
                            () => {

                                resolve(
                                    {
                                        msg: "Product Update successfully",
                                        status: 1
                                    }
                                )
                            }
                        ).catch(
                            (error) => {
                                console.log(error);
                                reject(
                                    {
                                        msg: "Product not Update",
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
                            msg: "Internal Server error",
                            status: 0
                        }
                    )
                }
            }
        )
    }

}

module.exports = ProductController;