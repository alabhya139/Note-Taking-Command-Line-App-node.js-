const _ = require('lodash')
const yargs = require('yargs')

const notes = require('./notes')

let command = process.argv[2]

const titleOptions = {
    describe:"Title of Note",
    demand:true,
    alias:'t'
}

const bodyOptions = {
    describe:"Body of Note",
    demand:true,
    alias:'b'
}

let args = yargs
    .command('add','Add a new Note',{
        title: titleOptions,
        body: bodyOptions
    })
    .help()
    .argv


if(command==='add'){
    notes.addNote(args.title,args.body)
}else if(command==='list'){
    let allNotes = notes.getAllNotes();
    if(allNotes.length===0){
        console.log("No notes exist! Please Create a new one and try again!")
    }
    allNotes.forEach(note => {
        notes.logNotes(note);
    });
}else if(command==='read'){
    let singleNote = notes.getNote(args.title);
    if(singleNote === undefined || singleNote === null){
        console.log("Note doesn't exist");
    }else {
        notes.logNotes(singleNote);
    }
    
}else if(command==='remove'){
    notes.removeNote(args.title)
}else{
    console.log("Command not found!")
}