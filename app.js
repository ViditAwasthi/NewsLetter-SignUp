const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")
const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.get("/", function(req, res){
  app.use(express.static("public"));

res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req, res){

const firstName =req.body.fName;
const lastName =req.body.lName;
const email =req.body.email;

const data = {

  members : [
    {
      email_address: email,
      status : "subscribed",
      merge_fields:{
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
};

const jsonData = JSON.stringify(data);
const url = "MAILCHIMP URL"

const options = {
  method : "POST",
  auth: "**AUTH**"
}
const request = https.request(url, options, function(response){
  response.on("data",function(data){
    console.log(JSON.parse(data));
  })

})
request.write(jsonData);
request.end();
})







app.listen(process.env.PORT || 3000,function(){

  console.log("Server Started at 3000");
})


// 0c55b455a9fc2306d0952b4e7d2b447f-us10
