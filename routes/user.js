const router = require("express").Router();
const UserController = require("../controllers/UserController");

router.get("/", UserController.findAll);
router.get("/add", UserController.registration);
router.post("/add", UserController.create);
router.get("/edit/:id", UserController.editProfile);
router.post("/edit/:id", UserController.saveProfile);

module.exports = router;