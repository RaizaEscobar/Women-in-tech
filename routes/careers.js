const express = require('express');
const router  = express.Router();
var dateFormat = require('dateformat');
const Career = require('../models/modelCareers');

router.get ('/careers', (req, res, next)=>{
   Career.find().then(careersList => {
    const careerEvents = careersList.map (function (career) {
      return {
       
        "title": career.title,
        "city" : career.city,
        "date" : dateFormat(career.date,"fullDate" ),
        "image": career.image,
        "limitPax": career.limitPax,
        "companies": career.companies,
        "price": career.price
    }
    }) 
    res.render('careers', {careerEvents});
});
});


router.get ('/careersDetails', (req, res, next)=>{
  res.render('careersDetails');
});
module.exports = router;