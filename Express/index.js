const express = require('express');
const app = express();

let port = 8080;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})



app.get('/',(req,res) => {
  res.send("Hello  am root");
})

//Handling a request to a specific path

// app.get('/apple',(req,res) => {
//   res.send("You contacted the apple route");
// })

// app.get('/banana',(req,res) => {
//   res.send("You contacted the banana route");
// })

// app.get('/cherry',(req,res) => {
//   res.send("You contacted the cherry route");
// })

// app.use((req, res) => {
//   res.status(404).send("This path does not exist");
// });


// app.use((req,res) => {
//   // console.log(req);
//   console.log(`Request received: ${req.method} ${req.url}`);
//   let code = "<h1>Fruits</h1><ul><li>Apple</li><li>Banana</li><li>Cherry</li></ul>";
//   res.send(code);
// })



//Path Parameters
// app.get("/:username/:id",(req,res) => {
//   console.log(req.params);
//   res.send(`Hello ${req.params.username}`);
// });


//Query Strings
app.get("/search",(req,res) => {
  let {q,color} = req.query;
  // res.send(`You searched for ${req.query.q}`);
  if(!q){
    res.send("Please provide a search query");
  }
  res.send(`Search results for ${q},${color}`);
});