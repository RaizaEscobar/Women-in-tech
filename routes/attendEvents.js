const express = require('express');
const router  = express.Router();
const Event = require('../models/modelEvent');
const Attendee = require('../models/modelAttendees');
const dateFormat = require('dateformat');


router.get('/attendEvents', (req, res, next)=>{
  Attendee.find({"userId":req.session.currentUser._id}).populate('eventId').exec((err, events)=>{
    
    const modifiedEvents = events.map(function (event) {
      return {
        "_id" : event.eventId._id,
        "title": event.eventId.title,
        "date" : dateFormat(event.eventId.date,"fullDate" ),
        "type" : event.eventId.type,
        "city" : event.eventId.city,
        "image": event.eventId.image
      }
    })

    res.render('attendEvents', {modifiedEvents });
  })
  
})

router.post('/notAttendEvents', (req, res, next)=>{
  Attendee.deleteOne({$and:[{"userId":req.session.currentUser._id},{"eventId": req.body.id}]}).then(ele =>{
     res.redirect("/attendEvents");
    });
});


module.exports = router;