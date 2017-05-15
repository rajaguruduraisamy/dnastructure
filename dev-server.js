// Creates a hot reloading development environment

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const DashboardPlugin = require('webpack-dashboard/plugin');
const config = require('./config/webpack.config.development');
const bodyParser = require('body-parser');
require("./src/server/datastore/setup");
var structureService = require("./src/server/services/structureService");
//var Structure = require("./src/server/datastore/structure");

//const structureService = require('./src/server/structureservice');

//Need to optimize it 


const app = express();
const compiler = webpack(config);

// Apply CLI dashboard for your webpack dev server
compiler.apply(new DashboardPlugin());

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3000;

function log() {
  arguments[0] = '\nWebpack: ' + arguments[0];
  console.log.apply(console, arguments);
}

app.use(bodyParser.json()) // support json encoded bodies
   .use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  },
  historyApiFallback: true
}));

app.use(webpackHotMiddleware(compiler));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './src/client/assets/index.html'));
});

app.get('/structure/:id', (req, res) => {
  // http://mongoosejs.com/docs/api.html#model_Model.findById
  console.log('getting structure');
  res.sendFile(path.join(__dirname, './src/client/assets/index.html'));
});

app.use("/api", structureService);

// app.post('/api/structure', function (req, res) {
//   console.log('in post request ', req.body);
//   var structure = new Structure( req.body );
//   structure.id = structure._id;
//   structure.markModified('ForceModified');
//   // http://mongoosejs.com/docs/api.html#model_Model-save
//   structure.save(function (err, structure) {
//     console.log('structure via post request ', structure);
//     res.status(200).json(structure);
//   });
// })

// .get('/api/structure/:id', function (req, res) {
//   // http://mongoosejs.com/docs/api.html#model_Model.findById
//   console.log('getting structure through get request');
//   Structure.findById( req.params.id, function ( err, structure ) {
//     console.log('structure api is ', structure);
//     console.log('errr', err);
//     res.status(200).json(structure);
//     //res.sendFile(path.join(__dirname, './src/client/assets/index.html'), { structure: {raj: 'guru'}});
//     //res.render('./src/client/assets/index.html', { structure: structure }, function(err, html) {
//     //  res.send(html);
//     //});
//   });
// })

// .put('/api/structure/:id', function (req, res) {
//   console.log('put request ', req.body);
//   // http://mongoosejs.com/docs/api.html#model_Model.findById
//   Structure.findById( req.params.id, function ( err, structure ) {
//     console.log('Found record to update', structure);
//     var struct = new Structure( req.body );
//     struct.markModified('ForceModified');
//     // http://mongoosejs.com/docs/api.html#model_Model-save
//     struct.save( function ( err, structure ){
//       console.log('Updated record', structure);
//       res.status(200).json(structure);
//     });
//   });
// })

// .delete('/api/structure/:id', function (req, res) {
//   // http://mongoosejs.com/docs/api.html#model_Model.findById
//   Structure.findById( req.params.id, function ( err, structure ) {
//     // http://mongoosejs.com/docs/api.html#model_Model.remove
//     structure.remove( function ( err, structure ){
//       res.status(200).json({msg: 'OK'});
//     });
//   });
// })

app.listen(port, host, (err) => {
  if (err) {
    log(err);
    return;
  }

  log('🚧  App is listening at http://%s:%s', host, port);
});
