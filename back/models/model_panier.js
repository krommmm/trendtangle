const mongoose = require("mongoose");

const panierSchema = new mongoose.Schema({
    userId: { type: String, required: false },
    items: [
        {
            itemId: { type: String, required: true },
            quantity: { type: Number, required: true, default: 1 }
        }
    ]
});

module.exports = mongoose.model("Panier", panierSchema);