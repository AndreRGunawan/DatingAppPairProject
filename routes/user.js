const router = require("express").Router();
const UserController = require("../controllers/UserController");

router.get("/", UserController.findAll);
router.get("/add", UserController.getRegisterForm);
router.post("/add", UserController.postRegisterForm);
router.get("/:id/delete", UserController.deleteUser); // created to edit user database

// router.get("/edit/:id", UserController.editProfile);
// router.post("/edit/:id", UserController.saveProfile);

module.exports = router;