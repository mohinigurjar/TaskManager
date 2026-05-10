const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },

    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
},
{timestamps: true});

//protect password from exposing
userSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    }
});

exports.User = mongoose.model("User", userSchema);