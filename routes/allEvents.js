
const express = require('express');
const router  = express.Router();
var dateFormat = require('dateformat');

const Event = require('../models/modelEvent');

router.get ('/allEvents', (req, res, next)=>{
  const event = {
    "title":       req.query.title,
    "city":        req.query.city,
    "date":        req.query.date,
    "type":        req.query.type,
    "description": req.query.description,
    "limit" :      req.query.limit
  }

let condition = {
  $and: [ ]
}

if (event.type != "all") {
  condition.$and.push({"type" : event.type})
} 

if (event.date != "") {
  condition.$and.push({"date" :event.date})
  
}

if (event.city != "") {
  condition.$and.push({"city" : event.city})
}



 if (event.type == "all" && event.city == "" && event.date == "") {
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


      res.render('allEvents', {modifiedEvents});

    });
  } catch (error) {
    console.log(error.message);
  }
}  else { 
  Event.find(condition).then(eventsList => {
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
    res.render('allEvents', {modifiedEvents});
  })
  .catch(error => {
    console.log('Error while retrieving events details:', error);
  });  
}
});



module.exports = router;