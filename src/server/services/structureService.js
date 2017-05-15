var mongoose = require("mongoose");
var Structure = require("../datastore/structure");

var router = require("express").Router();

router.route("/structure/:id").get(function (req, res) {
  
  Structure.findById( req.params.id, function ( err, structure ) {
    res.status(200).json(structure);
  });
}).put(function (req, res) {
  
    var structure = req.body;

    Structure.findOneAndUpdate({ id: req.params.id }, structure, { new: true }, function (err, structure) {
      if (err) {
        console.log(err);
        return res.status(400).json({ message: err });
      }
      return res.status(200).json(structure);
    });


}).delete(function (req, res) {
  
  Structure.findById( req.params.id, function ( err, structure ) {
    structure.remove( function ( err, structure ){
      res.status(200).json({msg: 'OK'});
    });
  });
});


router.route("/structure").post(function (req, res) {
  
  var structure = new Structure( req.body );
  structure.id = structure._id;
  structure.markModified('ForceModified');
  structure.save(function (err, structure) {
    res.status(200).json(structure);
  });
});

module.exports = router;