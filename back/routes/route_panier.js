const express = require("express");
const router = express.Router();
const ctrlPanier = require("../controllers/ctrl_panier");
const auth = require("../middlewares/auth");

router.post("/getpanier", auth, ctrlPanier.getOnePanier);
router.post("/add", auth, ctrlPanier.addToPanier);
router.post("/deleteitems", auth, ctrlPanier.deleteItemsFromPanier);
router.delete("/delete", auth, ctrlPanier.deletePanier)

module.exports = router; 