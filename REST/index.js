const express = require('express');
const app = express();
const path = require('path');
const fs = require("fs");
const { v4 : uuidv4 } = require('uuid');
const methodOverride = require('method-override');


const port = 8080;

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


app.get('/posts', (req, res) => {
    let posts = JSON.parse(fs.readFileSync("posts.json"));
    res.render('index.ejs',{posts});
});


app.get('/posts/new', (req, res) => {
    res.render('new.ejs');
});

app.get("/posts/:id", (req, res) => {
    const id = req.params.id;
    let posts = JSON.parse(fs.readFileSync("posts.json"));
    let post = posts.find((p) => p.id == id);
    res.render("show.ejs",{post});
});


app.post('/posts', (req, res) => {
    const { username, content } = req.body;
    let posts = JSON.parse(fs.readFileSync("posts.json"));
    let id = uuidv4();
    posts.push({ id ,username, content });
    fs.writeFileSync("posts.json", JSON.stringify(posts));
    res.redirect('/posts');
});

app.patch("/posts/:id", (req, res) => {
    let {id} = req.params;
    let newContent = req.body.content;

    let posts = JSON.parse(fs.readFileSync("posts.json"));
    let post = posts.find((p) => p.id == id);

    post.content = newContent;

    fs.writeFileSync("posts.json", JSON.stringify(posts));
    res.redirect('/posts');

});

app.get("/posts/:id/edit", (req, res) => {  
    let {id} = req.params;
    let posts = JSON.parse(fs.readFileSync("posts.json"));
    let post = posts.find((p) => p.id == id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    let posts = JSON.parse(fs.readFileSync("posts.json"));  
    posts = posts.filter((p) => p.id != id);
    fs.writeFileSync("posts.json", JSON.stringify(posts));
    res.redirect('/posts');
});