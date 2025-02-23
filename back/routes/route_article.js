const express = require("express");
const router = express.Router();
const ctrlArticle = require("../controllers/ctrl_article");
const multer = require("../middlewares/multer-config");
const auth = require("../middlewares/auth"); 

router.get("/", ctrlArticle.getArticles); 
router.get("/articlesBySearch", ctrlArticle.articleBySearch);
router.post("/articlesByPanier", auth, ctrlArticle.getArticlesByPanier);
router.get("/:id", ctrlArticle.getOneArticle);
router.post("/", multer, auth, ctrlArticle.createArticle);
router.patch("/:id", multer, auth, ctrlArticle.modifyArticle);
router.delete("/:id", auth, ctrlArticle.deleteArticle);
router.post("/:id/likes", auth, ctrlArticle.handleLike);

module.exports = router;