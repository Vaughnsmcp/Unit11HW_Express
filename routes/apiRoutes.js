'use strict';

// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

const noteData = require('../db.json');

const fs = require('fs');

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = app => {
  app.get('/api/notes', (req, res) => res.json(noteData));
  app.post('/api/notes', (req, res) => {
    noteData.push(req.body);
    fs.writeFile('./db.json',JSON.stringify(noteData),err =>{
      if (err) throw err;
      console.log("updated")
    })
    res.json(true);
   
  });


};
