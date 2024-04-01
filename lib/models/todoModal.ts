import mongoose from "mongoose";

// Define the schema
const todoSchema = new mongoose.Schema({
    tasks: {
        type: String,
        require: true
    },
    complete: {
        type: Boolean,
        default: false // Assuming you want to set a default value for 'complete'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users",
    }
}, {
    timestamps: true // This will automatically add createdAt and updatedAt fields
});

// Create the model
export const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema);