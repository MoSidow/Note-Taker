const fs =  require('fs')

const util = require('util');

const uuidvl = require('uuid/vl');

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);




class file {
    read() {
        return readFileAsync('db/db.json', 'utf8');
    }

    write() {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }

    getTheNotes() {
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

    addANote(note) {
        const {title, text } = note;
        if (!title || !text) {
            throw new Error('Title and Text cannot be left blank');
        }

      const newNote = {title, test, id: uuidvl()};
      return this.getTheNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote)

    }

removeANote(id) {
    return this.getTheNotes()
    .then((notes) => notes.filter((note) => note.id !== id))
    .then((filteredNotes) => this.write(filteredNotes));
}   
    
}

module.exports = new file()