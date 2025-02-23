
const Article = require("../models/model_article");



exports.createFlashOffer = async (req, res, next) => {
    try {
        const { articleIds, name, date, sale } = req.body;

        if (!Array.isArray(articleIds) || articleIds.length === 0) {
            return res.status(400).json({ message: "No articles selected." });
        }

        // Reset des anciens articles flash
        await Article.updateMany(
            { "flash.state": true },
            {
                $set: {
                    "flash.state": false,
                    "flash.name": null,
                    "flash.date": null,
                    "flash.sale": null
                }
            }
        );

        // Création des nouveaux articles flash
        await Article.updateMany(
            { _id: { $in: articleIds } },
            {
                $set: {
                    "flash.state": true,
                    "flash.name": name,
                    "flash.date": date,
                    "flash.sale": sale
                }
            }
        );

        return res.status(201).json({ msg: "Offer flash created with success!" });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

exports.deleteFlash = async (req, res, next) => {

    try {
        await Article.updateMany(
            { "flash.state": true },
            {
                $set: {
                    "flash.state": false,
                    "flash.name": null,
                    "flash.date": null,
                    "flash.sale": null
                }
            }
        );
        return res.status(200).json({ msg: "Offer flash deleted !" });
    } catch (err) {
        return res.status(400).json({ err });
    }
}

exports.getFlash = async (req, res, next) => {

    try {

        const articlesFlashed = await Article.find({ "flash.state": true });
        if (!articlesFlashed) {
            return res.status(400).json({ msg: "pas de ventes flashs" })
        }
        return res.status(200).json({ articles: articlesFlashed });

    } catch (err) {
        return res.stats(400).json({ err });
    }
};