import react from "react"
import $ from "jquery";
import React from "react";


function Main (){
  function createBook(e){
      e.preventDefault()
      $("#databaseContainer").empty();
    let bookName = $("#bookName").val()
    console.log(bookName.toString(), "bookName")
    fetch("http://localhost:8000/",{
        method: "POST",
        headers: {
            "Content-type": "application/json",
          },
        body:JSON.stringify({bookTitle: bookName.toString()})
    }).then(response=>{return response.json()})
    .then(data=>{
        console.log(data, "data from post")
        console.log(data.book["_id"])
        $("#bookId").val(data.book["_id"])
    })
    .catch(error=>console.log(error))
  }
  function createComment(e){
    e.preventDefault()
    console.log("create comment clicked")
   $("#databaseContainer").empty();
    let bookId = $("#bookId").val() 
    let newComment = $("#newComment").val()
    fetch("http://localhost:8000/",{
        method:"PUT",
        headers: {
            "Content-Type": "application/JSON"
          },
        body:JSON.stringify({
            bookId: bookId,
            comment: newComment
        })
    }).then(response=>{return response.json()})
    .then(data=>{
     console.log(data, "data from put");
     console.log(data.comments, "comment array");
     let comments = data.comments;
     $("#bookId").val("");
     $("#newComment").val("");
     $("#bookName").val(""); 
     for (let x = 0; x < comments.length; x++){
         console.log(comments[x], "mapped items")
         $(`<p>${comments[x]}<p />`).appendTo("#databaseContainer")
     }
    }).catch(error=>console.log(error))
  }

  return(
    <div>
      <h1>Personal Library</h1>
      <div id="searchContainer">
        <form id="createBook">
          <label for="bookName">Book Name:</label>
            <input type="text" id="bookName" placeholder="Book Name" required></input>    
          <button type="submit" onClick={createBook}>Find</button>
        </form>  
      </div> <hr/>
      <div id="updateContainer">
         <form id="createComment">
           <label for="bookId">Book Id:</label>
           <input type="text" id="bookId" required placeholder="Book Id"></input>
          <label for="newComment">New Comment</label>
            <input type="text" id="newComment" required placeholder="Comment"></input>
          <button type="submit" onClick={createComment}>Submit</button> 
        </form>
      </div>
      <div id="databaseContainer">

      </div>
    </div>
  )
}


export default Main