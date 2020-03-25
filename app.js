const express = require("express");
const app = express();
const PORT = 3000;
const router = require('./routes');

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended : false }));
app.use(router);

app.listen(PORT, () => {
    console.log(`This app running on port: `, PORT)
})