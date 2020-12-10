const express = require('express');
const router  = express.Router();
const Event=require ('../models/modelEvent');
const Attendee=require ('../models/modelAttendees');
const dateFormat = require('dateformat');

//enseña todos los eventos creados por el usuario
router.get('/myEventsCreated', (req, res, next) => {
  Event.find({"creator":req.session.currentUser._id}).then(events=>{
    const modifiedEvents = events.map (function (event) {
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

    res.render('myEventsCreated',{modifiedEvents});

  })
});

//modificar evento
router.get('/modifyEvents/:eventId',(req,res,next)=>{
  const id = req.params.eventId;  
  Event.findOne({"_id":id}).then(obj=>{
    const date = (JSON.stringify(obj.date).slice(1,11))
    const event = {
      "_id": obj._id,
      "title": obj.title,
      "city": obj.city,
      "date": date,
      "isConferenceSelected": obj.type == "conference",
      "isMeetUpSelected": obj.type == "meet up",
      "isCourseSelected": obj.type == "course",
      "isTalkSelected": obj.type == "talk",
      "isOtherSelected": obj.type == "other",
      "description": obj.description            
    }
    console.log(event)
    res.render('modifyEvents',event)

  })
  
})

function getImageByType(type)
{
  switch(type){
    case "conference":
      return "/images/Conference/conference.jpg";      
    case  "meet up":
      return "/images/Meetups/meetUp.jpg";
    case "course":
      return "/images/Courses/course.jpg";
    case "talk":
      return "/images/Talks/talk.jpg";
    case "other":
      return "/images/Others/other.jpg";
  }
}


router.post('/modifyEvents', (req, res, next)=>{
  const event = {
    "title":       req.body.title,
    "city":        req.body.city,
    "date":        req.body.date,
    "type":        req.body.type,
    "description": req.body.description,
    "limit" :      req.body.limit,
    "image":       getImageByType(req.body.type)   
  }
  
  Event.findByIdAndUpdate({"_id":req.body.id},event).then(el=>{
    res.redirect('/myEventsCreated')
  })

})


    
//eliminar evento
router.post('/delete', (req, res, next)=>{
  Event.deleteOne({"_id":req.body.id})
  .then(el=>{
    Attendee.deleteMany({"eventId":req.body.id}).then(ele=>{
      res.redirect('/myEventsCreated')
    })
    
  })
})

module.exports = router;