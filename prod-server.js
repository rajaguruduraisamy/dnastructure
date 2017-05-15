// Creates a hot reloading development environment

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
require("./src/server/datastore/setup");
var structureService = require("./src/server/services/structureService");

const app = express();

const port = process.env.PORT || 8080;


app.use(bodyParser.json()) // support json encoded bodies
   .use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/build/client'));

// set the home page route
app.get('/', function(req, res) {

    //res.render('index');
    res.sendFile(path.join(__dirname, './build/client/index.html'));
});

app.get('/structure/:id', function(req, res) {
  // http://mongoosejs.com/docs/api.html#model_Model.findById
  console.log('getting structure');
  res.sendFile(path.join(__dirname, './build/client/index.html'));
});

app.use("/api", structureService);

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});