const router = require("express").Router();
const UserController = require("../controllers/UserController");

router.get("/", UserController.findAll);
router.get("/add", UserController.registration);
router.post("/add", UserController.create)

module.exports = router;