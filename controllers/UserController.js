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
        let { email, password, name, phone_number, gender, age, look_for, location, bio } = req.body;
        let createdData = { email, password, name, phone_number, gender, age, look_for, location, bio };
        User.create(createdData)
            .then((data) => {
                // res.send(data)
                res.redirect("/")
            })
            .catch(err => { res.send(err) })
    }

    static editProfile(req, res) {
        let id = req.params.id;
        User.findAll(
            { where : { id} 
        })
        .then((data) => {
            // res.send(data)
            res.render("user-edit-profile", { data })
        })
        .catch(err => {
            res.send(err);
        })
    }

    static saveProfile(req, res) {
        let id = req.params.id;
        let { email, password, name, phone_number, gender, age, look_for, location, bio } = req.body;
        let updatedData = { email, password, name, phone_number, gender, age, look_for, location, bio };
        User.update(updatedData, {
            where : { id }
        })
            .then(() => {
                res.redirect("/users")
            })
            .catch(err => {
                res.send(err);
            })
    }
}

module.exports = UserController;