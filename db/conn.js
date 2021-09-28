const mongoose = require('mongoose');

const DB = process.env.DATABASE;


// mongoose.connect(DB, {
   
//     useNewUrlParser: true,
//     useUnifiedTopology: true
  
   
// }, err =>{
//     if(err) throw err;
//     console.log('Connected to MongoDB')
// })

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(()=>{
    console.log(`connection successfully established`);
  }).catch((err)=>console.log(`no connection`));