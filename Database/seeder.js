const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/PersonalLibrary", {
  useNewUrlParser: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));

db.once("open", function () {
  console.log("connected to db for seeders");
});

const bookSchema = new mongoose.Schema({
    Title: String,
    Comments: [String]
  });

const Book = mongoose.model("Book", bookSchema)

Book.deleteMany().then(()=>{
    console.log("cleared database")
})

const template = new Book({
    Title: "Tanakh",
    Comments:["Read it daily"]
});

console.log(template, "template works");

template.save().then((seeder)=>{
    console.log(seeder, "saved objects");
})

module.exports = Book;