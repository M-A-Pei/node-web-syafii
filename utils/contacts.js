const fs = require("fs");
const validator = require('validator');
const notifier = require('node-notifier');

if(!fs.existsSync("./data")){
    fs.mkdirSync("./data");
}

if(!fs.existsSync("./data/contacts.json")){
    fs.writeFileSync("./data/contacts.json", "[]");
}

const duplikat = (v) => {
    let file = JSON.parse(fs.readFileSync("./data/contacts.json", "utf-8"));
    let duplikat = file.find((contacts)=>{return contacts.email === v});
    if(duplikat) {
        return true;
    }
    return false;
}

const simpanContact = (data) => {
    let file = JSON.parse(fs.readFileSync("./data/contacts.json", "utf-8"));
    file.push(data);
    fs.writeFileSync("./data/contacts.json", JSON.stringify(file));
    return true;
}

const tampilList = () =>{
    let file = JSON.parse(fs.readFileSync("./data/contacts.json", "utf-8"));
    return file;
}

const findFile = (email) => {
    let file = JSON.parse(fs.readFileSync("./data/contacts.json", "utf-8"));
    let found = file.find((data) => data.email === email)
    return found
}

const deleteList = (email) =>{
    let file = JSON.parse(fs.readFileSync("./data/contacts.json", "utf-8"));
    file.forEach((element, i) => {
        if(element.email === email){
            file.splice(i, 1);
            fs.writeFileSync("./data/contacts.json", JSON.stringify(file));
        }
    });
}


module.exports = {simpanContact, tampilList, deleteList, findFile, duplikat};