const router = require("express").Router();
const user = require("./user");
const Controller = require("../controllers/Controller");
const image = require("./image");


router.get("/", Controller.findAll);
router.use("/users", user);
router.use("/image", image);
router.get('/login', Controller.getLogin)
router.post('/login', Controller.postLogin)
router.get('/logout', Controller.logout)

module.exports = router;