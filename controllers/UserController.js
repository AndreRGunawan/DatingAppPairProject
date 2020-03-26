const { User } = require("../models");

class UserController {
    static findAll(req, res) {
        User.findAll()
            .then(data => {
                console.log(data)
                res.render("dashboard.ejs", { data : data})
            })
            .catch(err => {
                res.send(err);
            })
    }
    static deleteUser(req,res){
        let selectedId = req.params.id
        User.destroy({where:{
            id: selectedId
        }})
        .then(function(result){
            res.redirect("/users")
        })
        .catch(function(error){
            res.send(error)
        })
    }

    static getRegisterForm(req, res) {
        let errormessage = req.session.error
        delete req.session.error
        let session = req.session // session need to "carried" up to end-point
        res.render('signup.ejs', { session, errormessage })
    }

    static postRegisterForm(req, res) {
        console.log(req.body)
        let password = req.body.password
        let confirm_password = req.body.confirm_password
        if (password == confirm_password){
            let newUser = { 
                email: req.body.email,
                name: req.body.name,
                phone_number: req.body.phone_number,
                gender: req.body.gender,
                age: req.body.age,
                look_for: req.body.look_for,
                location: req.body.location,
                bio: req.body.bio,
                password: req.body.password,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            User.create(newUser)
                .then(function(result1){
                    req.session.message = "Selamat, kamu sudah terdaftar!"
                    res.redirect("/")
                })
                .catch(function(error){
                    res.send(error) //error apabila create gagal karena validasi, misalnya karena umur di bawah 18
                })
        } else {
            req.session.error = "Password yang kamu masukkan tidak sama!"
            res.redirect("/users/add")
        }
    }
    static getloginForm(req,res){
        let errormessage = ""
        res.render("home", {errormessage})
    }
    static postloginForm(req,res){
        const {email, password} = req.body
        User.findOne({
            where:{
                email
            }
        })
        .then(function(user){
            if(user){
                if(user["password"] === password){
                    req.session.islogin = true
                    console.log(req.session)
                    res.redirect("/users") // ini harusnya redirect ke halaman dashboard user, sementara development ke home mula2 dulu
                } else {
                    res.send("Password anda salah!") // ubah jadi req.session.message
                }
            } 
        })
        .catch(function(error){
            res.send("Anda belum terdaftar! Silahkan register terlebih dahulu!")//dah pas, tapi harusnya pakai req.session.message
        })

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
    static logout(req, res) {
        req.session.destroy()
        console.log("You have been signed out")
        res.redirect('/users/login')
    }
}

module.exports = UserController;