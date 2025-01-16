const mongoose = require('mongoose');

const adminSchema = mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        contact: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: Boolean,
            default: 0
        }

    },
    {
        timestamps: true
    }
)

const AdminModel = new mongoose.model("admin", adminSchema);
module.exports = AdminModel;