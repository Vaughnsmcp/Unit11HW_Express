'use strict';

// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

const noteData = require('../db.json');


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = app => {
  app.get('/api/notes', (req, res) => res.json(noteData));
};
