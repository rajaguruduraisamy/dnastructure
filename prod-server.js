// Creates a hot reloading development environment

const path = require('path');
const express = require('express');
require("./src/server/datastore/setup");
var structureService = require("./src/server/services/structureService");

const app = express();

const port = process.env.PORT || 8080;



// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/build/client'));

// set the home page route
app.get('/', function(req, res) {

    res.render('index');
});

app.get('/structure/:id', (req, res) => {
  // http://mongoosejs.com/docs/api.html#model_Model.findById
  console.log('getting structure');
  res.sendFile(path.join(__dirname, './src/client/assets/index.html'));
});

app.use("/api", structureService);

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});