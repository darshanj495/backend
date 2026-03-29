const express = require('express');
const app = express();
const path = require('path');

const port=8080;

app.use(express.static(path.join(__dirname,"public/css")));
app.use(express.static(path.join(__dirname,"public/js")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.get("/",(req,res) => {
    res.render("home.ejs");
})

app.get("/ig/:username",(req,res) => {
    let username = req.params.username;
    const instaData = require("./data.json");

    if(instaData[username]) {
        res.render("insta.ejs",{data: instaData[username]});
    } else {
        res.render("error.ejs");
    }
});

app.get("/rolldice",(req,res) => {
  let data = Math.floor(Math.random() * 6) + 1;
  res.render("rolldice.ejs", { num: data });
});
app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
})

