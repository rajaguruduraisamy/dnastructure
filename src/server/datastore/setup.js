const mongoose = require('mongoose');
var Promise = require("bluebird");

//const DEFAULT_URI = 'mongodb://mongouser1:Madurai123!@ds011800.mlab.com:11800/dnastructure';
const DEFAULT_URI = 'mongodb://mongouser1:Madurai123!@ds143211.mlab.com:43211/dnastructure';

mongoose.Promise = Promise;

mongoose.connect(process.env.MONGOLAB_URI || DEFAULT_URI, function (error) {
    if (error) {
    	console.error(error);
    }
    else console.log('mongo connected');
});
