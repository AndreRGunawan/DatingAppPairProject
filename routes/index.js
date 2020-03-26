const router = require("express").Router();
const user = require("./user");
const userController = require("../controllers/UserController.js")
const loginController = require("../controllers/loginController.js");
const image = require("./image");

//Main home page
router.get("/", (req, res) => loginController.findAll(req,res));

//register / signup process -- userController here
router.get('/register', (req, res) => userController.getRegisterForm(req,res)) 
router.post('/register', (req,res) => userController.postRegisterForm(req,res))







//login process -- loginController here
router.get('/login', loginController.getLogin)
router.post('/login', loginController.postLogin)











//logout process here
router.get('/logout', loginController.logout)

//users
router.use("/users", user);

//images
router.use("/image", image);

module.exports = router;