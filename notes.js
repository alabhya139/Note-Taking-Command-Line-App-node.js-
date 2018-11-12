const fs = require('fs')

let fetchNote = ()=>{
    try{
        let oldNotes = fs.readFileSync('notes-data.json');
        return JSON.parse(oldNotes)
    }catch(e){
       return [];
    }
}

let saveNotes = (notes)=>{
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));
}

let addNote = (title,body)=>{
    let notes = fetchNote();

    let note = {
        title,
        body
    };

    let duplicates = notes.filter((note)=>note.title===title);

    if(duplicates.length===0){
        notes.push(note);
        console.log("Note created");
        console.log("-------------------------------------------------------------")
        saveNotes(notes);
    }else{
        console.log("Title already exists! Please enter a different title!")
    }
}

let getAllNotes = ()=>{
    let notes = fetchNote();
    return notes;
}

let getNote =(title)=>{
    let notes = fetchNote();
    let singleNote  = notes.filter((note)=> note.title == title);
    return singleNote[0];
}

let removeNote = (title)=>{
    let notes = fetchNote();
    let modifiedNotes = notes.filter((note)=>note.title!=title);
    saveNotes(modifiedNotes);
    if(notes.length === modifiedNotes.length){
        console.log("Note not found!")
    }else{
        console.log(`note with title ${title} removed successfully`)
    }
}

let logNotes = (notes)=>{
    console.log("----------------------------------------------");
    console.log(`Title: ${notes.title}`);
    console.log(`Body: ${notes.body}`);
    console.log("----------------------------------------------");
}

module.exports = {
    addNote,
    getAllNotes,
    getNote,
    removeNote,
    logNotes
}