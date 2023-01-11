const fs =  require('fs')

const util = require('util');

const uuid = require('uuid');

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);




class file {
    read() {
        return readFileAsync('./db/db.json', 'utf8');
    }

    write() {
        return writeFileAsync('./db/db.json', JSON.stringify(notes));
    }

    getNotes() {
        return this.read().then((notes) => {
            let recievedNotes;
            try {
                recievedNotes = [].concat(JSON.parse(notes)) 
            } catch(err) {
                recievedNotes = []
            }
            return recievedNotes;
        });
    }

    addNote(note) {
        const {title, text } = note;
        if (!title || !text) {
            throw new Error('Title and Text cannot be left blank');
        }

      const newNote = {title, text, id: uuid()};
      console.log(newNote, "newNote")
      return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote)

    }

removeNote(id) {
    return this.getNotes()
    .then((notes) => notes.filter((note) => note.id !== id))
    .then((filteredNotes) => this.write(filteredNotes));
}   
    
}

module.exports = new file()