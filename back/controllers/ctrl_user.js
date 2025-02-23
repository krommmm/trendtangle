require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/model_user");
const Article = require("../models/model_article");



exports.signUp = async (req, res, next) => {
    try {
        const isUserHere = await User.findOne({ email: req.body.email });
        if (isUserHere) return res.status(400).json({ msg: "Email already taken" });
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            email: req.body.email,
            name: req.body.name,
            password: hash
        });
        await user.save();
        return res.status(201).json({ msg: "User created" });

    } catch (err) {
        return res.status(400).json({ err });
    }
};

exports.logIn = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(400).json({ msg: "Email not in dataBase" })
            }
            bcrypt.compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(400).json({ msg: "Password invalid" });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id, isAdmin: user.isAdmin },
                            `${process.env.SECRET_PASSWORD}`,
                            { expiresIn: "24h" }
                        )

                    })
                })
                .catch((err) => res.status(500).json({ err }))
        })
        .catch((err) => res.status(400).json({ err }));
};

exports.isUserAdmin = async (req, res, next) => {
    try {
        return res.status(200).json({ isAdmin: req.auth.isAdmin ? true : false });
    } catch (err) {
        return res.status(400).json({ err });
    }
};

exports.isUserConnected = async (req, res, next) => {
    try {
        if (req.auth && req.auth.userId) {
            return res.status(200).json({ msg: "user connected" });
        } else {
            return res.status(401).json({ msg: "user not connected" });
        }
    } catch (err) {
        return res.status(400).json({ err });
    } 
};

exports.isUserArticleOwner = async (req, res, next) => {

    try {

        const userId = req.body.userId;
        const articleId = req.body.articleId;
        const article = await Article.findOne({ _id: articleId });
        if (!article) return res.status(400).json({ msg: "Article not found" });
        const posterId = article.posterId;

        if (posterId === userId || req.auth.isAdmin === true) {
            return res.status(200).json({ msg: "rights authorized", isUserOwner: true });
        } else {
            return res.status(400).json({ msg: "rights unauthorized", isUserOwner: false })
        }

    } catch (err) {
        return res.status(400).jsont({ err });
    }
};