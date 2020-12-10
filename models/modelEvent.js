const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const eventSchema = new Schema({
  title: String,
  description: String,
  date: Date,
  city: String,
  type: {type: String, enum: ['conference', 'meet up', 'course', 'talk','other']},
  image: String,
  limit: Number,
  creator: Schema.Types.ObjectId,
  image:String

}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;