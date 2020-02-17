const util = require("util");
const fs = require("fs");
const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

class Store {
    constructor(){
        this.Id = 0
    }
read(){
    return readFileAsync('./db.json', 'utf8')
}
    write(note){
        return writeFileAsync('./db.json', JSON.stringify(note))
    }
    getnote(){
        return this.read().then(notes => {
            let parseNotes;
            try{
                parseNotes = [].concat(JSON.parse(notes))
            }catch(err){
                //parseNotes[];
            }
            return parseNotes
        })
    }
    addnote(note){const { title, text } = note; //es6 deconstructed
    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }
    // Increment `this.lastId` and assign it to `newNote.id`
    const newNote = { title, text, id: ++this.lastId };
    // Get all notes, add the new note, write all the updated notes, return the newNote
    return this.getnote()
      .then(notes => [...notes, newNote])//spread operator
      .then(updatedNotes => this.write(updatedNotes))
      .then(() => newNote);

}
    removenote(id){// Get all notes, remove the note with the given id, write the filtered notes
        return this.getnote()
          .then(notes => notes.filter(note => note.id !== parseInt(id)))
          .then(filteredNotes => this.write(filteredNotes));
    
    
    
    
    
    }
} module.exports = new Store()
