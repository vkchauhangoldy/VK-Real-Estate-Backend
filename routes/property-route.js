const express = require("express");
const router = express.Router();

const PropertyController = require("../controllers/property");
//
router.get("/all", PropertyController.getAllProperties);

router.get("/:userId", PropertyController.getUserProperties);

router.get("/add/basic-info", PropertyController.getBasicInfo);

router.post("/add/basic-info", PropertyController.postBasicInfo);

router.get("/add/property-detail", PropertyController.getPropertyDetail);

router.post("/add/property-detail", PropertyController.postPropertyDetail);

router.get("/add/general-info", PropertyController.getGeneralInfo);

router.post("/add/general-info", PropertyController.postGeneralInfo);

router.post("/add/location-info", PropertyController.postProperty);

router.get("/search/:ppdId", PropertyController.getSearchProperty);

router.put("/edit/:ppdId", PropertyController.updateProperty);

router.delete("/delete/:ppdId", PropertyController.deleteProperty);

module.exports = router;
