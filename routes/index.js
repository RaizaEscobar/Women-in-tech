const express = require('express');
const router  = express.Router();
var dateFormat = require('dateformat');
const Event = require('../models/modelEvent');

/* GET home page */
router.get('/', (req, res, next) => {
  let userLogged = req.session.currentUser !==undefined;
  if(userLogged){
    res.render('dashboard',  req.session.currentUser)
  }
  else{
      try {
        Event.find().then(eventsList=>{
              const modifiedEvents = eventsList.map (function (event) {
                return {
                  "_id" : event._id,
                  "title": event.title,
                  "city" : event.city,
                  "date" : dateFormat(event.date,"fullDate" ),
                  "type" : event.type,
                  "description" : event.description,
                  "image": event.image
              }
              })
      
      
              res.render('index', { modifiedEvents,  layout: 'layoutNotLoggedIn.hbs' });

      
          });
        } catch (error) {
          console.log(error.message);
        }

   
  }

 
});



module.exports = router;

