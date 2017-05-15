var mongoose = require("mongoose");
var Structure = require("../datastore/structure");

var router = require("express").Router();

router.route("/structure/:id").get(function (req, res) {
  // http://mongoosejs.com/docs/api.html#model_Model.findById
  console.log('getting structure through get request');
  Structure.findById( req.params.id, function ( err, structure ) {
    console.log('structure api is ', structure);
    console.log('errr', err);
    res.status(200).json(structure);
  });
}).put(function (req, res) {
  console.log('put request ', req.body);
  // http://mongoosejs.com/docs/api.html#model_Model.findById
  Structure.findById( req.params.id, function ( err, structure ) {
    console.log('Found record to update', structure);
    var struct = new Structure( req.body );
    struct.markModified('ForceModified');
    // http://mongoosejs.com/docs/api.html#model_Model-save
    struct.save( function ( err, structure ){
      console.log('Updated record', structure);
      res.status(200).json(structure);
    });
  });
}).delete(function (req, res) {
  // http://mongoosejs.com/docs/api.html#model_Model.findById
  Structure.findById( req.params.id, function ( err, structure ) {
    // http://mongoosejs.com/docs/api.html#model_Model.remove
    structure.remove( function ( err, structure ){
      res.status(200).json({msg: 'OK'});
    });
  });
});


router.route("/structure").post(function (req, res) {
  console.log('in post request ', req.body);
  var structure = new Structure( req.body );
  structure.id = structure._id;
  structure.markModified('ForceModified');
  // http://mongoosejs.com/docs/api.html#model_Model-save
  structure.save(function (err, structure) {
    console.log('structure via post request ', structure);
    res.status(200).json(structure);
  });
});

module.exports = router;