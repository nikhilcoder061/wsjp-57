const mongoose = require('mongoose');

// schema start
const userData = mongoose.Schema(
    {
        name: {
            type: String,
            maxLength: 20,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        phone: {
            type: String,
            unique: true,
            maxLength: 20
        },
        age: {
            type: Number,
            default: 18
        },
        password: {
            type: String,
            minLength: 6
        },
        status: {
            type: Boolean,
            default: true
        }
    }, {
    timestamps: true
}
)

// schema end

const userModal = mongoose.model("users", userData);

module.exports = userModal;
