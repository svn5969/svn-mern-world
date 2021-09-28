const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('../db/conn');
const User = require('../model/userSchema');
const authenticate = require('../middleware/authenticate')

// router.get('/', (req, res) => {
//     res.send(`Hello World From SvN Router`)
// });

// using async awaits

router.post('/register', async (req, res) => {
    const { name, email, work, phone, password, cpassword} = req.body
    if (!name || !email || !work || !phone || !password || !cpassword) {
        return res.status(422).json({ error: 'Filled the form properly' })
    }

    try {
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(422).json({ error: "Email already Exist" })
        } else if (password != cpassword) {
            return res.status(422).json({ error: "password are not matching" });
        } else {
            const user = new User({ name, email, work, phone, password, cpassword });
            await user.save()
            res.status(201).json({ message: "user registered Successfully" });
        }
    }
    catch (err) {
        console.log(err)
    }
})

// Login route
router.post('/signin', async (req, res) => {
    try {
        
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Please Fill the Data Properly" })
        }
        const userLogin = await User.findOne({ email: email })
        // console.log(userLogin)
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password)
            const token = await userLogin.generateAuthToken();
            console.log(token)
            
            res.cookie("jwtoken",token,{
              expires: new Date(Date.now() + 25892000000),
              httpOnly: true  
            });

            if (!isMatch) {
                res.status(400).json({ message: "Invalid Credentials Password" })
            } else {
                res.json({ message: "user signin successfuly" })
            }
        }else{
            res.status(400).json({ message: "Invalid Credentials Email" })
        }


    } catch (err) {
        console.log(err)
    }
})

// About us page 

router.get('/about',authenticate,(req,res)=>{
    res.send(req.rootUser);
    console.log(`Hello fro svn about  middleware`);
  });
  
  // get user data for contact us and home page
  router.get('/getdata',authenticate,(req,res)=>{
    res.send(req.rootUser);
    console.log(`Hello from svn about `);
  })
 
  // Contact us page 

  router.post('/contact',authenticate,async(req,res)=>{
  try {
      const {name,email,phone,work,message}= req.body;
      if (!name || !email || !phone  || !message) {
          console.log('error in contact form')
         return res.json({error:"Please fill the Contact form"}) 
      }
      const userContact = await User.findOne({_id:req.userId})
      if (userContact) {
          const userMessage = await userContact.addMessage(name,email,phone,message)
          await userContact.save();
          res.status(201).json({message:"User contact Successfully"})
      }
  } catch (error) {
      console.log(error)
  }
  });

  // Logout  page 

router.get('/logout',(req,res)=>{
    console.log(`Hello from svn logout`);
    res.status(200).send('User Logout');
    res.clearCookie('jwtoken',{path: '/'});
   
  });
  

module.exports = router;



    // using only promises

    //   router.post('/register',(req,res)=>{
    //       const {name,email,work,phone,password,cpassword} = req.body
    //      if (!name || !email || !work|| !phone || !password || !cpassword) {
    //         return res.status(422).json({error: 'Filled the form properly'}) 
    //      }
    //      User.findOne({email:email})
    //      .then((userExist)=>{
    //          if (userExist) {
    //              return res.status(422).json({error: "Email already Exist"})
    //          }
    //          const user = new User({name,email,work,phone,password,cpassword});

    //          user.save().then(() => {
    //              res.status(201).json({message:"user registered Successfully"});
    //          }).catch((err)=>{
    //              res.status(500).json({error:"Failed Registered"})
    //          }).catch(err => {console.log(err)})
    //      })

