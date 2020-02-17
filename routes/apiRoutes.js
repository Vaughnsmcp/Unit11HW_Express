'use strict';

// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

const noteData = require('../db.json');
const store = require("../store");
const path =require('path');

const fs = require('fs');
const router = require('express').Router()

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = app => {
  app.get('/api/notes', (req, res) => {
    store.getnote().then(notes=>res.json(notes))
    .catch(err=>res.status(500).json(err))
  })



  app.post('/api/notes', (req, res) => {
    store.addnote(req.body)
    .then((note)=> res.json(note))
    .catch(err=> res.status(500).json(err))
    noteData.push(req.body);
    fs.writeFile(path.join('../db.json'),JSON.stringify(noteData),err =>{
      if (err) throw err;
      console.log("updated")
    })
    res.json(true);
  
   
  });
  app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;
    let index;
    for (let i in noteData) {
        if (id === noteData[i].id) {
            index = i;
        }
    }
    noteData.splice(index, 1);
    for (let i in noteData) {
        noteData[i].id = i;
    }
    fs.writeFile(path.join(__dirname, '../db.json'), JSON.stringify(noteData),
        err => {
            if (err) throw err;
        });
    return res.json(true);
})
};





  