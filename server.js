const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// function filterByQuery
function filterByQuery(query, notesArray) {
    let titleArray = [];
    let filteredResults = notesArray;

    if(query.title === 'string'){
        titleArray = [query.title];
    } else {
        titleArray = query.title;
    }
    titleArray.forEach(title => {
        filteredResults = filteredResults.filter(
            note => note.title.indexOf(title) !== -1
        );
    });
    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.diet);
      }
      if (query.text) {
        filteredResults = filteredResults.filter(animal => note.text === query.species);
      }
      return filteredResults;
    }

function findById(body, notesArray){
    const result = notesArray.filter(note => note.id === id) [0];
    return result;
}

function createNewNote(body, notesArray){
    const note = body; 
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, './data/notes/json'),
        JSON.stringify({ notes: notesArray}, null, 2)
    );
    return animal; 
}

//  GET /api/notes read the db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });

// POST /api/notes receive new note to save on the request body
app.post('/api/notes', (req, res) => {
    // set id based on what the next index of the array will be
    req.body.id = notes.length.toString();
  
    if (!validateNote(req.body)) {
      res.status(400).send('The note is not properly formatted.');
    } else {
      const note = createNewNote(req.body, notes);
      res.json(note);
    }
  });

//add it to the db.json file

//return the new note to the client. 

// give each note a unique id when it's saved

// app.listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });