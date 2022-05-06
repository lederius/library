const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const PORT = 8000;
// const mongoose = require("mongoose");

const Book = require("../Database/seeder");

const MongoURI = "mongodb://127.0.0.1:27017/PersonalLibrary";

console.log("connected to db");

app.use(function (req, res, next) {
    console.log(req.method, req.path, " on port", PORT);
    next();
  });

  app.route("/")
  .post((req, res) => {
    console.log("POST request is being made on /");
    console.log(req.body.bookTitle, "should be booktitle as a string")
    let Title = req.body.bookTitle
    let query={Title:Title}
    Book.findOne(query,((err,match)=>{
        console.log(match, "any matches???");
        if (err) console.err(err)
        else if(match === null){
            let newBook = new Book({
                Title
            })
            newBook.save(err=>{
                if (err) console.err(err);
                console.log("post finished")
                res.send({
                status: `${Title} is a new book in DB`,
                book: newBook
            })
            
        })
        }else{
            console.log("post finished")
            res.send({
                status: `${Title} not added`,
                book: match
            })
        }
    }))
  })
  .put((req, res)=>{
    console.log("put request is being made on /")
    console.log(req.body.comment, "comment")
    console.log(req.body.bookId,"id")
    let newComment = req.body.comment
    let idNum = req.body.bookId
    Book.findById(idNum, ((err,match)=>{
          if (err) console.err(err);
          if (match === null) {
              res.send({
                  status: "no match",
                  display: "Invalid ID"
                })
            }else{
              console.log(match, "match")
              console.log(match.Comments, "match.Comments")
              let oldComments = match.Comments
              let updatedComments = oldComments.concat(newComment)
              match.Comments = updatedComments
              match.save(err=>{
                  if (err) console.err(err);
                  res.send({
                    status: `${newComment} is new comment`,
                    comments: match.Comments
              })
          })
        }
    }))
  })

  app.listen(PORT, () => {
    console.log("the server is working on port", PORT);
  });