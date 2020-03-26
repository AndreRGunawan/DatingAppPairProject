const router = require("express").Router();
const user = require("./user");
const Home = require("../controllers/Home");
// const image = require("./image");


router.get("/", Home.findAll);
router.use("/users", user);
// router.use("/image", image);

module.exports = router;