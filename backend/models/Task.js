
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    deadline: { type: Date }, 
    quantity: { type: Number, required: true },
    foodCategory: { type: String, required: true },
    location: { type: String, required: true },
});

module.exports = mongoose.model('Task', taskSchema);
