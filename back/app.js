
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const routeUser = require("./routes/route_user");
const routeArticle = require("./routes/route_article");
const routePanier = require("./routes/route_panier");
const routeFlash = require("./routes/route_flash");
const path = require("path");
const { updateFlash } = require("./hook/hook_cron_flashs");


app.use(express.json());

mongoose.connect(`mongodb+srv://${process.env.MDB_USER}:${process.env.MDB_PASSWORD}@cluster0.w3cza.mongodb.net/`)
    .then(() => console.log("Connection to MongoDB successful ! "))
    .catch(() => console.log("Connection to MongoDB failled ! "));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Accept, Content, Content-Type, Authorization, Origin, X-Requested-With");
    next();
});

updateFlash();

app.use("/api/auth", routeUser);
app.use("/api/articles", routeArticle);
app.use("/api/panier", routePanier);
app.use("/api/flash", routeFlash);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;