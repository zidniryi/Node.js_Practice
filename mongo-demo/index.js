const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/foo", { useNewUrlParser: true })
  .then(() => {
    console.log("connected to db");
  })
  .catch(e => {
    console.log(e);
  });

const Person = mongoose.model(
  "Person",
  new mongoose.Schema({
    name: String,
    age: Number
  })
);

Person.create({ name: "mr. foo", age: 11 }).then(() => {
  Person.find().then(d => {
    console.log(d);
  });
});