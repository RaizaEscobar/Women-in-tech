const express = require('express');
const router  = express.Router();
const Event = require('../models/modelEvent');
const Attendee = require('../models/modelAttendees');
const User = require('../models/modelUser');

const dateFormat = require('dateformat');

 router.get('/allEvents/:id', (req,res,next)=>{
  let eventsListDos = Event.findById(req.params.id).then(event=>{
    Attendee.find({"eventId":req.params.id}).populate('userId').exec((err,attendees)=>{
      const modifiedEvent = {
        "_id" : event._id,
        "title": event.title,
        "date" : dateFormat(event.date,"fullDate" ),
        "type" : event.type,
        "city" : event.city,
        "attendees":attendees,
        "description":event.description,
        "image":event.image
      }
      res.render('detailEvent', modifiedEvent);
    }) 

    });
 });


 router.post("/allEvents", (req, res, next) => {
    
  const attendanceInfo = {
    eventId: req.body.eventId,
    userId: req.session.currentUser._id,
  
  };

  const theAttendance = new Attendee(attendanceInfo);

  Attendee.findOne({$and:[{'userId' : req.session.currentUser._id },{"eventId": req.body.eventId}]}).then(user => {
    
    if (user !== null) {

      Event.findById(req.body.eventId).then(event=>{
        Attendee.find({"eventId":req.body.eventId}).populate('userId').exec((err,attendees)=>{
          const modifiedEvent = {
            "_id" : event._id,
            "title": event.title,
            "date" : dateFormat(event.date,"fullDate" ),
            "type" : event.type,
            "city" : event.city,
            "attendees":attendees,
            "description":event.description,
            "image":event.image,
            "errorMessage" : "already registered!"
          }
          console.log(modifiedEvent)
          res.render('detailEvent', modifiedEvent);
          return ;
        }) 
    
        });
    
    }
    else{
      theAttendance.save((err) => {
        if (err) {
           next(err);
          return;
        }
      res.redirect('/');
     });
    }
  })
  
 
}); 
 

module.exports = router;
