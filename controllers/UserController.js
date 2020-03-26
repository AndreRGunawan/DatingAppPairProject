const { User } = require("../models");

class UserController {
    static findAll(req, res) {
        User.findAll()
            .then(data => {
                res.render("dashboard", { data })
            })
            .catch(err => {
                res.send(err);
            })
    }

    static registration(req, res) {
        res.render("signup");
    }

    static create(req, res) {
        let createdData = req.body;
        User.create(createdData)
            .then(() => {
                res.redirect("/")
            })
            .catch(err => { res.send(err) })
    }
}

module.exports = UserController;