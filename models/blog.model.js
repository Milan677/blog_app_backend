const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    username: { type:String}, 
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, enum: ['Business', 'Tech', 'Lifestyle', 'Entertainment'], required: true },
    date: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    comments: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
            content: { type: String, required: true },
            date: { type: Date, default: Date.now },
        },
    ],
});

const blogModel = mongoose.model('Blog', blogSchema);

module.exports = {blogModel};
