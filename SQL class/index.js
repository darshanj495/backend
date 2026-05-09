const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use("views",express.static("views"));



const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: 'DABBAB123',
});

let getRandomUser =()=> {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
};

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});

app.get("/",(req,res)=>{
  let q = `select count(*) as count from user`;
  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      console.log(result[0]);
      res.render("home.ejs",{ count: result[0].count});
    })
  }
  catch(err){
    console.log(err);
    res.send("There is some error in the DB");
  }
});

app.get("/users",(req,res)=>{
  let q = `select * from user`;
  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      res.render("user.ejs",{ users: result});
    })
  }
  catch(err){
    console.log(err);
    res.send("There is some error in the DB");
  }
});

app.get("/user/:id/edit",(req,res)=>{
  let {id} = req.params;
  let q = `select *from user where id  = '${id}'`;
  
  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      let user = result[0];
      res.render("edit.ejs",{user});
    })
  }
  catch(err){
    console.log(err);
    res.send("There is some error in the DB");
  }
  
});

app.patch("/user/:id",(req,res)=>{
  let {id} = req.params;
  let {password: formP, name:formU} = req.body;
  let q = `select *from user where id  = '${id}'`;
  
  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      let user = result[0];
      if(formP!=user.password){
        res.send("Wrong Password Entered");
      }
      else{
        let q2 = `update user set name = '${formU}' where id = '${id}'`;
        connection.query(q2,(err,result)=>{
          if(err) throw err;
          res.redirect("/users");
        });
      }
    })
  }
  catch(err){
    console.log(err);
    res.send("There is some error in the DB");
  }
});


//enter new user

app.get("/user/new",(req,res)=>{
  let id = faker.string.uuid();
  res.render("newUser.ejs",{id});
});

app.post("/user",(req,res)=>{
  let {id, name, email, password} = req.body;
  let user = [id, name, email, password];
  let q = `insert into user values(?,?,?,?)`;
  try{
    connection.query(q,user,(err,result)=>{
      if(err) throw err;
      res.redirect("/users");
    });
  }
  catch(err){ 
    console.log(err);
    res.send("There is some error in the DB");
  }
});

//delete user

app.get("/user/delete",(req,res)=>{
  res.render("delete.ejs");
});

app.delete("/users",(req,res)=>{
  let {email,password} = req.body;
  let q = `select * from user where email = '${email}'`;
  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      if(result.length==0){
        res.send("No user with this email exists");
      }
      else{
        let user = result[0];
        if(password!=user.password){
          res.send("Wrong Password Entered");
        }
        else{
          let q2 = `delete from user where email = '${email}'`;
          connection.query(q2,(err,result)=>{
            if(err) throw err;
            res.redirect("/users");
          });
        }
      }
    });
  }
  catch(err){
    console.log(err);
    res.send("There is some error in the DB");
  }
})