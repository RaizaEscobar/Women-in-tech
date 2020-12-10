const express = require('express');
const router  = express.Router();

const bcrypt  = require("bcrypt");
const User = require('../models/modelUser');
const Event = require('../models/modelEvent');
const saltRounds = 10; 
const salt  = bcrypt.genSaltSync(saltRounds);

//Renderización

router.get('/signup', (req, res, next) => {
  res.render('auth/signup', {layout: 'layoutNotLoggedIn.hbs'});
});

router.get('/login', (req, res, next) => {
  res.render('auth/login', {layout:'layoutNotLoggedIn.hbs'});
});

router.get('/logout', (req, res, next) => {
  req.session.destroy((el)=>{
    res.redirect("/");
  })
  
});

//Llamada a la base de datos

router.post('/signup', (req, res, next)=>{
  const nickName = req.body.nickname;
  const email = req.body.email;
  const password= req.body.password;
  const repeatPassword= req.body.repeatPassword;

  //checks signup

  if(nickName===""|| email==="" || password===""|| repeatPassword===""){
    res.render('auth/signup', {errorMessage: "there are empty fields, please correct them", layout: 'layoutNotLoggedIn.hbs'})
    return;
  }

  if(password!=repeatPassword){
    res.render ('auth/signup', {errorMessage:"Passwords do not match", layout: 'layoutNotLoggedIn.hbs'})
    return;

  }

  User.findOne({"nickName":nickName}).then(user=>{
    if(user!==null){
      res.render('auth/signup',{errorMessage:"the user already exists",layout: 'layoutNotLoggedIn.hbs'})
      return;
    }
    User.findOne({"email":email}).then(user=>{
      if(email!==null){
        res.render('auth/signup',{errorMessage:"This email is already registered, please use another",layout: 'layoutNotLoggedIn.hbs'})
      }
      return;
    });    
  });

  
  const hashPassword = bcrypt.hashSync(password, salt);
  
  //Creamos el usuario en la base de datos

  User.create({
    "nickname": nickName,
    "email": email,
    "password": hashPassword
  }).then(ele=>{
    req.session.currentUser=ele;
    res.redirect("/");
  });

});


router.post('/login', (req, res, next)=>{
  const user = req.body.user;  
  const password= req.body.password;
 
  //checks login

  if(user===""|| password===""){
    res.render('auth/login',{errorMessage: "the user or the password are empty!", layout: 'layoutNotLoggedIn.hbs' });
    return;
  }
  User.findOne ({$or:[{"nickname":user}, {"email":user}]}).then(user=>{
    if(user===null){
      res.render('auth/login', {errorMessage:"The user doesn't exist!", layout: 'layoutNotLoggedIn.hbs'});
      return;
    }  
  if(bcrypt.compareSync(password,user.password)){
    req.session.currentUser=user;
    res.redirect ("/");
  }
  else{
    res.render('auth/login',{errorMessage: "the password is not correct!", layout: 'layoutNotLoggedIn.hbs'});
  }
})
.catch(error => {
  next(error);
})
})

module.exports = router;