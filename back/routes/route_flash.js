const express = require("express");
const router = express.Router();
const ctrlFlash = require("../controllers/ctrl_flash");
const auth = require("../middlewares/auth");

router.patch("/", auth, ctrlFlash.createFlashOffer);
router.delete("/", auth, ctrlFlash.deleteFlash);
router.get("/", ctrlFlash.getFlash);
// router.put("/", auth, ctrlFlash.updateFlash);
// router.patch("/", ctrlFlash.cleanUpFlash);

module.exports = router; 