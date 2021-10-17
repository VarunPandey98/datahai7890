const express = require('express');
const app = express();
const port = 1000;
const path = require('path');
const hbs = require('hbs')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const database = require('./mongooose');

const css_path = path.join(__dirname, "./css");
const static_path = path.join(__dirname, './template/views');
const partial_path = path.join(__dirname, "./template/partials");

hbs.registerPartials(partial_path)

app.set("view engine","hbs");
app.set("views",static_path);

//body parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(css_path));

app.get('/home',(req,res)=>{
    res.render("home")
});

app.get('/subject',(req,res)=>{
    res.render("subject")
});

app.get('/teacher',(req,res)=>{
    res.render("subject")
});

app.get('/configure',(req,res)=>{
    res.render("configure")
});

app.get('/generate',(req,res)=>{
    res.render("generate")
});

app.get('/register',(req,res)=>{
    res.render("register");
})

app.get('/login',(req,res)=>{
    res.render("login");
})


app.get('*',(req,res)=>{
    res.render("404");
})

// Routes
app.post('/register',  async(req, res)=>{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const confirmPassword= req.body.confirmPassword;
       console.log("hello")
       //    validation
    //    let errors = [];
    //    // check require fileds
    //    if(!email|| !password || !confirmPassword){
    //         errors.push({msg:"Please fill in all fields"});
    //     }
    
    //     // check password match
    //     if(password!==confirmPassword){
    //         errors.push({msg:"Password do not match"})
    //     }
      
    //     //check password length
    
    //    if(password.length<6){
    //        errors.push({msg:"Password should be atleast 6 characters"})
    //    }
    
    //    if(errors.length>0){
    //       res.render("home",{
    //           errors,
    //           email,
    //           password,
    //           confirmPassword
    //       })
    //    }else{
    //        res.send("pass")
    //    }

       const data = new database({
           email:req.body.email,
           password:req.body.password,
           confirmPassword:req.body.confirmPassword
       })
       console.log(req.body.email);
   
       const db = await data.save();
       res.status(201).render("home")
       console.log(db);
    } catch (error) {
        res.send(error).status(400);
        console.log(error)
    }

});

app.listen(port,()=>{
    console.log(`server is connected on ${port}`);
})

// mongodb connection
mongoose.connect('mongodb://localhost:27017/timetable', { useNewUrlParser: true, useUnifiedTopology: true })
  .then((err) => {
    console.log("database connected")
  }).catch((err) => {
    console.log(err)
  })

   