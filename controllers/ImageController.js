const multer = require("multer");
const fs = require("fs");
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        let dir = "../uploads";
        if(!fs.existsSync(dir)) fs.mkdirSync(dir);
        callback(null, dir)
    },

    filename : function(req, file, callback) {
        callback(null, file.originalname);
    }
})

const multerOn = multer({ storage:storage }).array('files', 12);
const { Image } = require("../models");

class ImageController {
    static findAll(req, res) {
        Image.findAll()
            .then((data) => {
                res.send(data)
            })
            .catch(err => {
                res.send(err);
            })
    }

    static imageForm(req, res) {
        res.render("edit-profile")
    }

    static uploads(req, res, next) {
        multerOn(req, res, (err) => {
            if(err) {
                return res.send('Something gone wrong')
            }
            res.send("upload completed")
        })
    }
}

module.exports = ImageController;

