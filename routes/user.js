const router = require("express").Router();
const UserController = require("../controllers/UserController");

router.get("/", UserController.findAll);
router.get("/add", UserController.getRegisterForm);
router.post("/add", UserController.postRegisterForm);
router.get("/edit/:id", UserController.editProfile);
router.post("/edit/:id", UserController.saveProfile);
router.get("/delete/:id", UserController.delete);

module.exports = router;