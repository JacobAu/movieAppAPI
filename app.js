var express = require("express");
var app = express();
app.set("view engine","ejs"); //so we dont have to append ejs to the end of every ejs file when we render

const request = require("request");

app.get("/",function(req,res){
    res.render("search");
});

app.get("/results",function(req,res){
    var movieSearch = req.query.movieSearch; // This is how you access a submitted query string. 
    var apiCall = "http://omdbapi.com/?s=" + movieSearch + "&apikey=thewdb"
    request(apiCall,function(error, response, body){
        if(!error && response.statusCode == 200){
            parsedData = JSON.parse(body);
            if(parsedData["Response"] == "True"){
                res.render("results",{parsedData : parsedData});
            }
            else{
                res.send(parsedData["Error"]);
            }
        }
    });
});

app.listen(3000,function(){
    console.log("server has started");
})