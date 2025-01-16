const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            maxlength: 200,
            unique: true,
        },
        slug: {
            type: String,
            maxlength: 200,
            unique: true
        },
        short_description: {
            type: String,
        },
        long_description: {
            type: String,
        },
        original_price: {
            type: Number,
            default: 1,
        },
        discount_percentage: {
            type: Number,
            default: 0
        },
        final_price: {
            type: Number,
            min: 1
        },
        category_id: {
            type: mongoose.Schema.ObjectId,
            ref: "category"
        },
        colors: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "color"
            }
        ],
        main_image: {
            type: String,
            default: null
        },
        other_image: [
            {
                type: String,
            }
        ],
        stock: {
            type: Boolean,
            default: false
        },
        top_selling: {
            type: Boolean,
            default: false
        },
        status: {
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true
    }
)

const ProductModel = mongoose.model("Products", productSchema);
module.exports = ProductModel;