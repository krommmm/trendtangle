const Panier = require("../models/model_panier");



exports.getOnePanier = async (req, res, next) => {
    try {
        if (req.auth && req.auth.userId) {
            const panier = await Panier.findOne({ userId: req.auth.userId });
            if (!panier) {
                const nouveauPanier = new Panier({
                    userId: req.auth.userId,
                    items: []
                })
                await nouveauPanier.save();
                return res.status(201).json({ msg: "Panier created" });
            }
 
            const panierObj = panier.toObject();
            return res.status(200).json({ panier: panierObj });
        } else {
            return res.status(400).json({ msg: "user not connected" });
        }
    } catch (err) {
        return res.status(400).json({ err });
    }
};

exports.addToPanier = async (req, res, next) => {
    try {
        if (req.auth && req.auth.userId) {

            let panier = await Panier.findOne({ userId: req.auth.userId });

            // Si le panier n'existe pas, on le crée automatiquement et on l'associe à la variable panier
            if (!panier) {
                panier = new Panier({
                    userId: req.auth.userId,
                    items: []
                });
                await panier.save();
            }

            const item = {
                itemId: req.body.itemId,
                quantity: req.body.quantity
            };

            const existingItem = panier.items.find(i => i.itemId === item.itemId);

            if (existingItem) {
                existingItem.quantity += req.body.quantity;
            } else {
                panier.items.push(item);
            }

            await panier.save();

            return res.status(200).json({ msg: "Item added to panier", panier });
        } else {
            return res.status(401).json({ msg: "User not connected" });
        }

    } catch (err) {
        return res.status(400).json({ err });
    }
};


exports.deleteItemsFromPanier = async (req, res, next) => {
    try {
        if (req.auth && req.auth.userId) {
            const panier = await Panier.findOne({ userId: req.auth.userId });
            const item = panier.items.find(item => item.itemId === req.body.itemId);
            if (item.quantity <= req.body.quantity) {
                panier.items = panier.items.filter(item => item.itemId !== req.body.itemId);
                await panier.save();
                return res.status(200).json({ msg: "Article deleted" });
            }

            item.quantity -= Math.abs(req.body.quantity);
            await panier.save();
            return res.status(200).json({ msg: "article soustrais" });

        } else {
            return res.status(401).json({ msg: "User not connected" });
        }

    } catch (err) {
        return res.status(400).json({ err });
    }
};

exports.deletePanier = async (req, res, next) => {
    try {
        if (req.auth && req.auth.userId) {

            await Panier.deleteOne({ userId: req.auth.userId });
            return res.status(200).json({ msg: "Panier deleted" });
        } else {
            return res.status(401).json({ msg: "User not connected" });
        }

    } catch (err) {
        return res.status(400).json({ err });
    }
};