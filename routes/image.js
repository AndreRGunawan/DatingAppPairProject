const router = require("express").Router();
const ImageController = require("../controllers/ImageController");


router.get("/", ImageController.findAll);
router.get("/upload", ImageController.registration);
router.post("/upload", ImageController.uploads)


module.exports = router;