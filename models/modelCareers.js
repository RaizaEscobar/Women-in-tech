const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const careerSchema = new Schema(
  {
    title: String,
    date: Date,
    city: String,
    price: Number,
    limitPax: Number,
    companies: Number
  });

const Career = mongoose.model("Career", careerSchema);

module.exports = Career;
