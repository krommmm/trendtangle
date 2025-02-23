
const Article = require("../models/model_article");

async function flashService() {

    const currentDate = new Date().getTime();
    const article = await Article.findOne({ "flash.state": true })
    if (article && article.flash.date <= currentDate) {
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
    }
}

module.exports = { flashService };