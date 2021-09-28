const dotenv = require('dotenv');
const mongoose = require('mongoose')
const express = require('express');
const app = express();

const cookieparser=require("cookie-parser");
app.use(cookieparser());

dotenv.config({path:'./config.env'});

require('./db/conn');
// const require = require('./model/userSchema');

app.use(express.json())

// we make the router files to make our route easy
app.use(require('./router/auth'));


const PORT = process.env.PORT || 7777;


// MiddleWare

// const middleware =(req,res,next)=>{
//  console.log(`Hello fro svn middleware`);
// next();
// }



// app.get('/',(req,res)=>{
//   res.send(`Hello World From SvN Server`)
// });

// app.get('/about',middleware,(req,res)=>{
//     res.send(`Hello World From SvN About Server`)
//     console.log(`Hello fro svn about  middleware`);
//   });

  // app.get('/contact',(req,res)=>{
  //   // res.cookie("Test",'shovon')
  //   res.send(`Hello World From SvN Contact Server`)
  // });

  app.get('/signin',(req,res)=>{
    res.send(`Hello World From SvN signin Server`)
  })

  app.get('/signup',(req,res)=>{
    res.send(`Hello World From SvN signup Server`)
  })


// 3: step heroku 

if(process.env.NODE_ENV == "production")
app.use(express.static("client/build"));


app.listen(PORT,()=>{
    console.log(`server is running at port no  ${PORT}`)
})