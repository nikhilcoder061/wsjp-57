const mongoose = require('mongoose');

const colorSchema = mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
        },
        colorCode: {
            type: String,
            unique: true,
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

const ColorModel = new mongoose.model("color", colorSchema);
module.exports = ColorModel;