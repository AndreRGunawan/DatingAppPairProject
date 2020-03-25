const router = require("express").Router();
const user = require("./user");
const Home = require("../controllers/Home");

router.get("/", Home.findAll);
router.use("/user", user);

module.exports = router;