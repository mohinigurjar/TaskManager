const mongoose = require("mongoose");
const { User } = require("./user.model");

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 200
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {timestamps: true});

//middleware to filter soft deleted tasks
taskSchema.pre( /^find/ , function(){
    this.where({
        deletedAt: null
    })
})


exports.Task = mongoose.model("Task", taskSchema);
