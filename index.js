const express = require("express"); //third party module
const app = express();// instance of the app
const { bookSeries_setOne, bookSeries_setTwo, findAuthorsByLetter } = require("./series");
const fs = require("fs");

//test using the core module fs
fs.readFile("story.txt", "utf8", (error, data) => {
    if(error) {
        console.log("error", error);
    } else {
        console.log(data);
    }
});

//create our first route
//home route
app.get("/", (req, res) => { // request, response
    //execution/activity
    // there are many tasks that may or maynot need
    // to happen before you respons with data.

    // first scenario -------------------------
    // you need to iterate through an array of data and return
    // some modified data as a response.
    //----------------------------------------

    // third scenario -------------------------
    // you recieve some data from the user while they are making the request
    // , you will need to parse incoming data, you will need to store the data
    // in the DB and then finally you will need to respond with a redirect(route).
    //----------------------------------------


    return res.json({ message: "welcome to my node app" });
});

app.get("/wrongPage", (req, res) => {
    return res.json({ message: "information requested cannot be found here, please try again" });
});

app.get("/authorOne", (req, res) => {
    return res.json({ message: "WIP, please try again" });
});
//request: localhost:8000/add/7/8
//response: {"answer":15}
//req.params is an object
//{num1: "7", num2: "8"}
app.get('/bookList1', (req, res) => {
    let answer = bookSeries_setOne;
    return res.json({ bookObj: answer });
});
app.get('/bookList2', (req, res) => {
    let answer = bookSeries_setTwo;
    return res.json({ bookObj: answer });
});
app.get('/search/:letter', (req, res) => {
    let letter = req.params.letter;
    let answer = findAuthorsByLetter(letter);
    return res.json({ answer: answer });
});


//request: localhost:8000/read?something=story
//response: {"message":"lorem ipsum..."}
//req.query is an object
//{something: "story"}
app.get("/read", (req, res) => {
    // grab query string
    let element = req.query.something;  //story
    // pass query string into the fs function
    
    fs.readFile(`${element}.txt`, 'utf8', (error, data) => {
        if(error) {
            return res.json({message: "there is an issue, try again later"});
        } else {
            // return the data that comes from the txt file
            return res.json({message: data});
        }
    });
    
});

//SET UP A PORT NUMBER, and listen for server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log("server is running on PORT", PORT);
});

