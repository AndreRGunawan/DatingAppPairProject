const { Image, ImageUser, User } = require("../models");
const multer = require("multer");
const path = require("path");
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
const fs = require("fs");
const storage = multer.diskStorage({
    destination: path.join(__dirname + './../uploads'),

    filename : function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage : storage
}).single('image');

class ImageController {
    static findAll(req, res) {
        Image.findAll()
            .then((dataImages) => {
                res.render("dashboard", { dataImages })
            })
            .catch(err => {
                res.send(err);
            })
    }

    static formUpload(req, res) {
        Image.findAll({
            include : [ User ]
        })
            .then(image => {
                res.render("editImages", { image })
            })
            .catch(err => {
                res.send(err);
            })
    }
    static uploads(req, res) {
        upload(req, res, err => { 
            if (err) { res.send(err) }
            else {
            let { path } = req.file;
            Image.create({ 
                file : path,
             })
            .then((data) => {
                let read = JSON.parse(fs.readFileSync("./firebase.json","utf8"));
                let newData = {};
                newData.file = data[0].file;
                let final = JSON.stringify(newData,null, 2);
                read.push(fs.writeFileSync("./firebase.json", final, "utf8"))
                    res.redirect("/image/upload")
                })
                .catch(err => {
                    res.send(err)
                })
            }
         });
    }

    static like(req, res) {

    }

    static dislike(req, res) {
        
    }
}

module.exports = ImageController;

