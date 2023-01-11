const fs =  require('fs')

const util = require('util');

const uuid = require('uuid');

// Read and writes the notes
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);



class file {
    read() {
        return readFileAsync('db/db.json', 'utf8');
      }
    
      write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
      }
    
      getNotes() {
        return this.read().then((notes) => {
          let RecievedNotes;
    
          
          try {
            RecievedNotes = [].concat(JSON.parse(notes));
          } catch (err) {
            RcievedNotes = [];
          }
    
          return RecievedNotes;
        });
      }
    
      addNote(note) {
        const { title, text } = note;
    
        if (!title || !text) {
          throw new Error("Title' and Text cannot be leftblank");
        }
    
     
        const newNote = { title, text, id: uuid() };
    
        
        return this.getNotes()
          .then((notes) => [...notes, newNote])
          .then((updatedNotes) => this.write(updatedNotes))
          .then(() => newNote);
      }
    
      removeNote(id) {
      
        return this.getNotes()
          .then((notes) => notes.filter((note) => note.id !== id))
          .then((filteredNotes) => this.write(filteredNotes));
      }
    }

module.exports = new file()