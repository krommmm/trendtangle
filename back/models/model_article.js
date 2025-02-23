const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
    posterId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    isNew: { type: Boolean, default: false },
    discount: { type: Number, required: false },
    flash: {
        state: { type: Boolean, default: false },
        name: { type: String },
        date: { type: Number },
        sale: { type: Number }
    },
    color: { type: String, enum: ["blue", "orange", "green", "white", "black"], required: true },
    gender: { type: String, enum: ["male", "female", "unisex", "child"], required: true },
    category: { type: String, enum: ["pull", "pants", "t-shirt", "shoes"], required: true },
    imgUrl: { type: String, required: true },
    likes: { type: Number, default: 0 },
    userLikes: { type: [String] },
    stars: { type: Number, required: true }
});

module.exports = mongoose.model("Article", articleSchema);