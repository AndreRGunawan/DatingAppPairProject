const { User } = require("../models");

class Controller {
    static findAll(req, res) {
        let session = req.session;
        res.render('home.ejs', { session });
    }
    
    static getLogin(req, res) {
        let errormessage = req.session.error
        delete req.session.error
        let session = req.session
        res.render('home.ejs', { session , errormessage });
    }


    static postLogin(req, res) {
        const { email, password } = req.body
        User.findOne({
            where:{
                email
            }
        })
        .then(function(data){
            if(data){
                if(data["password"] === password){
                    req.session.islogin = true
                    res.render("dashboard", { data }) // ini harusnya redirect ke halaman dashboard user, sementara development ke home mula2 dulu
                } else {
                    req.session.error = "Password anda salah!"
                    res.redirect("/")
                }
            } 
        })
        .catch(function(error){
            req.session.error = "Anda belum terdaftar! Silahkan register terlebih dahulu!"
            res.redirect("/")
        })
        
        // let { username,password } = req.body
        // User.findAll({
        //     where : {
        //         username
        //     }
        // })
        //     .then(result => {
        //         let login = result[0].dataValues;
        //         if(User.password == password) {
        //             req.session.isLogin = true;
        //             req.session.username = username;
        //         } else {
        //             req.session.error = "User / Password invalid!";
        //             res.redirect('/login')
        //         }
        //         req.app.locals.successMessage = `Anda Login sebagai ${login.username}` //doesn't seem used at all
        //         res.redirect("/users")
        //     })
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