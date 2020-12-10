const mongoose = require("mongoose");
const Career = require("../models/modelCareers");

/* const dbName = "proyectoModulo2";
mongoose.connect(`mongodb://localhost/${dbName}`); */

const careers = [
  {
    title: "Women Careerhack",
    date: "2014-01-01T23:28:56.782Z",
    city: "Barcelona",
    price: 50,
    limitPax: 100,
    companies: 20,
  },
  {
    title: "Women Tech Career Day",
    date: "2014-01-01T23:28:56.782Z",
    city: "New York",
    price: 100,
    limitPax: 200,
    companies: 50,
  },
  {
    title: "Women Job Fair",
    date: "2014-01-01T23:28:56.782Z",
    city: "Athens",
    price: 20,
    limitPax: 100,
    companies: 10,
  },
  {
    title: "Women Careerhack",
    date: "2014-01-01T23:28:56.782Z",
    city: "Barcelona",
    price: 20,
    limitPax: 100,
    companies: 20,
  },
  {
    title: "Hiring Summit - Women in Tech",
    date: "2014-01-01T23:28:56.782Z",
    city: "Amsterdam",
    price: 60,
    limitPax: 120,
    companies: 25,
  },
  {
    title: "allWomen Careerhack",
    date: "2014-01-01T23:28:56.782Z",
    city: "Berlin",
    price: 80,
    limitPax: 100,
    companies: 20,
  },
  {
    title: "Women in Technology - Global Career Fair",
    date: "2014-01-01T23:28:56.782Z",
    city: "Dubai",
    price: 120,
    limitPax: 400,
    companies: 60,
  },
  {
    title: "WomenHack",
    date: "2014-01-01T23:28:56.782Z",
    city: "Moscow",
    price: 20,
    limitPax: 80,
    companies: 10,
  },
  {
    title: "Tech Up for Women",
    date: "2014-01-01T23:28:56.782Z",
    city: "Tokyo",
    price: 60,
    limitPax: 300,
    companies: 45,
  },
  {
    title: "Women in Business and Technology Career Fair",
    date: "2014-01-01T23:28:56.782Z",
    city: "Buenos Aires",
    price: 15,
    limitPax: 100,
    companies: 10,
  },
];

/* Career.create(careers, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Created ${careers.length} career events`);
  mongoose.connection.close();
});
 */

mongoose
  .connect('mongodb://localhost/proyectomodulo2', {
    useNewUrlParser: true,
  })
  .then(() => {
    return Career.create(careers);
  })
  .then(insertedCareers => {
    console.log('Inserted careers:', insertedCareers.length);
    return Career.create(careers);
  })
  .then(insertedCareers => {
    console.log('Inserted careers:', insertedCareers.length);
    mongoose.connection.close();
  })
  .catch(err => console.log(err));