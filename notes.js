const fs = require('fs')
const chalk = require('chalk')

const getNotes = ()=>{
    console.log('Your Notes..!!')
}

const addNote = (title,body)=>{

    const notes = loadNotes()

    const duplicateItem = notes.find((notes) => notes.title === title)
    
    if(!duplicateItem){
        
        notes.push({title,body}={})

        saveNotes(notes)
        console.log('New note added')
    }else{
        console.log('Note title taken')
    }
}

const saveNotes= (notes)=> {
    const parsedData = JSON.stringify(notes)
    fs.writeFileSync('notes.json', parsedData)
}

const loadNotes = ()=>{
    try{
        const dataJSON = fs.readFileSync('notes.json')
        return JSON.parse(dataJSON.toString())
    }catch(e){
        return []
    }
}

const removeNote = (title)=>{
    
    const notes = loadNotes()

    const removedNotes = notes.filter((notes)=>notes.title!=title)

    if(notes.length == removedNotes.length){
        console.log(chalk.red.inverse('Title not found'))
    }
    else{
        saveNotes(removedNotes)
        console.log(chalk.green.inverse('Note removed'))
    }

}


const listNotes = ()=>{
    const notes = loadNotes()

    notes.map((notes)=> {
         console.log(notes.title)
    });
}

function readNote(title) {
    const notes = loadNotes()

    const reqItem = notes.find((note) => note.title === title)

    if (reqItem) {
        console.log(reqItem.title)
        console.log(reqItem.body)
    }
    else {
        console.log(chalk.red.inverse('Note not found'))
    }
}
module.exports = {
    getNotes : getNotes,
    addNote : addNote,
    removeNote:removeNote,
    listNotes:listNotes,
    readNote:readNote
} 