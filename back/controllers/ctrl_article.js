const Article = require("../models/model_article");
const Panier = require("../models/model_panier");
const fs = require("fs");

exports.getArticles = (req, res, next) => {
    Article.find()
        .then((articles) => {
            if (!articles) return res.status(400).json({ msg: "No articles yet" });
            const articlesWithoutPosterId = articles.map((article) => {
                const articleWithoutPosterId = article.toObject();
                delete articleWithoutPosterId.posterId;
                return articleWithoutPosterId;
            });

            return res.status(200).json({ articles: articlesWithoutPosterId });
        })
        .catch((err) => res.status(400).json({ err }));
};

exports.getOneArticle = (req, res, next) => {
    Article.findOne({ _id: req.params.id })
        .then((article) => {
            if (!article) {
                return res.status(400).json({ msg: "Impossible to find the article" });
            }
            const articleWithoutPosterId = article.toObject();
            delete articleWithoutPosterId.posterId;

            return res.status(200).json({ article: articleWithoutPosterId });
        })
        .catch((err) => res.status(400).json({ err }));
};

exports.getArticlesByPanier = async (req, res, next) => {

    try {
        const panier = await Panier.findOne({ userId: req.auth.userId });
        if (!panier) return res.status(400).json({ msg: "no panier yet" });
        const itemIds = panier.items.map(item => item.itemId);
        const articles = await Article.find({ _id: { $in: itemIds } });
        return res.status(200).json({ articles: articles });
    } catch (err) {
        return res.status(401).json({ err });
    }
};


exports.createArticle = async (req, res, next) => {
    try {
        const articleObj = req.file ? { ...req.body, imgUrl: req.file.filename, posterId: req.auth.userId } : { ...req.body, posterId: req.auth.userId };
        const article = new Article({ ...articleObj });
        await article.save();
        return res.status(201).json({ msg: "article created" });
    } catch (err) {
        return res.status(401).json({ err });
    }

};

exports.deleteArticle = (req, res, next) => {
    Article.findOne({ _id: req.params.id })
        .then((article) => {
            if (!article) {
                return res.status(400).json({ msg: "Impossible to find the article" })
            }
            if (req.auth.userId === article.posterId || req.auth.isAdmin === true) {
                fs.unlink(`images/${article.imgUrl}`, () => {
                    article.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ msg: 'Article deleted' }))
                        .catch((err) => res.status(400).json({ err }));
                })
            } else {
                return res.status(400).json({ msg: "Not authorized" });
            }
        })
        .catch((err) => res.status(400).json({ err }));
};

exports.modifyArticle = async (req, res, next) => {
    try {

        // Ce controller nécéssite le front-end de ne pas envoyer le contenu d'un input dans le formData s'il est vide (notamment un file)
        const article = await Article.findOne({ _id: req.params.id });
        if (!article) return res.status(400).json({ msg: "Article not found" });
        if (!req.file) {
            delete req.body.imgUrl;
            const updatedArticle = await Article.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true });
            if (!updatedArticle) return res.status(400).json({ msg: "Article did not update" });
        }
        else if (req.file && Object.keys(req.body).length <= 0) {
            fs.unlink(`images/${article.imgUrl}`, () => { });
            const articleWithFileUpdated = await Article.updateOne({ _id: req.params.id }, { $set: { imgUrl: req.file.filename }, });
            if (!articleWithFileUpdated) return res.status(400).json({ msg: "Article with file did not update" });
        }
        else if (req.file && Object.keys(req.body).length > 0) {
            fs.unlink(`images/${article.imgUrl}`, () => { });
            const articleWithFileUpdated = await Article.updateOne({ _id: req.params.id }, { $set: { imgUrl: req.file.filename }, });
            const updatedArticle = await Article.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true });
            if (!articleWithFileUpdated) return res.status(400).json({ msg: "Article with file did not update" });
        }

        return res.status(200).json({ msg: "Article updated" });

    } catch (err) {
        return res.status(500).json({ err });
    }
};

exports.handleLike = async (req, res, next) => {
    const article = await Article.findOne({ _id: req.params.id });
    if (!article) return res.status(400).json({ msg: "no article" });
    const simpleArticle = article.toObject();
    let likes = simpleArticle.likes;
    let userLikes = simpleArticle.userLikes;

    if (userLikes.includes(req.auth.userId)) {
        likes--;
        const userIndex = userLikes.findIndex((userLike) => userLike === req.auth.userId);
        userLikes.splice(userIndex, 1);
        await Article.updateOne({ _id: req.params.id }, { $set: { likes: likes, userLikes: userLikes } });
    } else {
        likes++;
        userLikes.push(req.auth.userId);
        await Article.updateOne({ _id: req.params.id }, { $set: { likes: likes, userLikes: userLikes }, });
    }

    return res.status(200).json({ likes: article.likes });
};

exports.articleBySearch = async (req, res, next) => {
    try {
        const search = req.query.searchedArticles || '';

        if (!search) {
            return res.status(400).json({ message: 'Le champ de recherche est vide' });
        }

        const articles = await Article.find({
            $or: [
                { name: { $regex: search, $options: 'i' } },
                { color: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } },
                { gender: { $regex: search, $options: 'i' } }
            ]
        });

        if (!articles) return res.status(400).json({ msg: "no articles found" });

        return res.status(200).json({ articles: articles });

    } catch (err) {
        return res.status(500).json({ err });
    }
};

