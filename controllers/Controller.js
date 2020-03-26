const { User } = require("../models");

class Controller {
    static findAll(req, res) {
        res.render("home")
    }
    
    static getLogin(req, res) {
        res.render('login-form', { errors: null });
    }

    static postLogin(req, res) {
        let { username,password } = req.body
        User.findAll({
            where : {
                username
            }
        })
            .then(result => {
                let login = result[0].dataValues;
                if(User.password == password) {
                    req.session.isLogin = true;
                    req.session.username = username;
                } else {
                    throw new Error(`Password incorrect !`)
                }
                req.app.locals.successMessage = `Anda Login sebagai ${login.username}`
                res.redirect("/users")
            })
    }

    static logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                res.send(err)
            } else {
                req.app.locals.successMessage = `Successfully logout`;
                res.redirect('/')
            }
        });
    }
}
module.exports = Controller;