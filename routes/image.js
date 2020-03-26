const router = require("express").Router();
const ImageController = require("../controllers/ImageController");

router.get("/", ImageController.findAll);
router.get("/upload", ImageController.formUpload);
router.post("/upload", ImageController.uploads);
router.get("/like/:id", ImageController.like);
router.get("/dislike/:id", ImageController.dislike);


module.exports = router;