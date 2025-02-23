const express = require("express");
const router = express.Router();
const ctrlUser = require("../controllers/ctrl_user");
const auth = require("../middlewares/auth");

router.post("/signup", ctrlUser.signUp);
router.post("/login", ctrlUser.logIn);
router.get("/isuseradmin", auth, ctrlUser.isUserAdmin);
router.get("/isuserconnected", auth, ctrlUser.isUserConnected);
router.post("/isuserowner", auth, ctrlUser.isUserArticleOwner);

module.exports = router; 