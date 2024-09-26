const express = require("express");

const {getAllProducts, getAllProductsTesting} = require("../controllers/ProductControllers");

const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/testing").get(getAllProductsTesting);

module.exports = router;