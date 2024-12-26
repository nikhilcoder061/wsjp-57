const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
        },
        slug: {
            type: String,
            unique: true,
        },
        imageName: {
            type: String,
            default: null
        },
        status: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)

const CategoryModel = new mongoose.model("categories", categorySchema);
module.exports = CategoryModel;