const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const router = require('./routes/index.js');
const session = require ("express-session")

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended : false }));
app.use(session({
    secret: 'hacktiv8',
    resave: false,
    saveUninitialized: true
}))

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server start on port: `, PORT)
})