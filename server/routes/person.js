var express = require('express');
var router = express.Router();
// bring in our Mongoose model
var Person = require('../models/person.schema.js');

router.get('/', function(req, res) {
    // find all of the people in the collection
    Person.find({}, function(err, data) {
        if (err) {
            console.log('find error: ', err);
            res.sendStatus(500);
        } else {
            console.log('found data: ', data);            
            res.send(data);
        }
    });
});

router.get('/:name', function(req, res) {
    var searchName = req.params.name;
    console.log(searchName);
    // find all of the people in the collection
    Person.find({name: searchName}, function(err, data) {
        if (err) {
            console.log('find error: ', err);
            res.sendStatus(500);
        } else {
            console.log('found data: ', data);            
            res.send(data);
        }
    });
});

router.post('/', function(req, res) {
    console.log('new person to store: ', req.body);

    // use model/constructor to make a Mongoose Object
    var personToSaveToTheCollection = new Person(req.body);

    // insert into our collection
    personToSaveToTheCollection.save(function(err, data) {
        console.log('saved to the collection: ', data);
        if(err) {
            console.log('save error: ', err);
            
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
        
    });
});

router.put('/addinternetpts/:id', function(req, res) {
    var personId = req.params.id;

    Person.findByIdAndUpdate (
        {_id: personId},
        {$set: { internetPts: req.body.internetPts} },
        function(err,data) {
            if(err) {
                console.log('update  error: ', err);
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    )

});


router.put('/:id', function(req, res) {
    var personId = req.params.id;

    console.log('new location:', req.body.location);
    Person.findByIdAndUpdate(
        { _id: personId },
        { $set: { location: req.body.location } },
        function(err, data) {
            if (err) {
                console.log('update error: ', err);

                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    )
});

router.delete('/:id', function(req, res) {
    Person.findByIdAndRemove(
        { _id: req.params.id },
        function(err, data) {
            if (err) {
                console.log('delete error: ', err);

                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        }
    );
});


module.exports = router;