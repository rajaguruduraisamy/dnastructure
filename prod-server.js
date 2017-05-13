// Creates a hot reloading development environment

const path = require('path');
const express = require('express');

const app = express();

const port = process.env.PORT || 8080;



// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/build/client'));

// set the home page route
app.get('/', function(req, res) {

    res.render('index');
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});