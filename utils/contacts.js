const fs = require("fs");
const validator = require('validator');

if(!fs.existsSync("./data")){
    fs.mkdirSync("./data");
}

if(!fs.existsSync("./data/contacts.json")){
    fs.writeFileSync("./data/contacts.json", "[]");
}

const simpanContact = (data) => {
    let file = JSON.parse(fs.readFileSync("./data/contacts.json", "utf-8"));
    let duplikat = file.find((contacts)=>{return contacts.email === data.email});

    if(!validator.isEmail(data.email)){console.log(error(`ini bukan email`)); rl.close(); return false}

    if(duplikat) {
        console.log(error(`email sudah ada`));
        return false;
    }

    file.push(data);
    fs.writeFileSync("./data/contacts.json", JSON.stringify(file));
    console.log(success(`terimakasih untuk informasi mu \n`));
}

const tampilList = () =>{
    let file = JSON.parse(fs.readFileSync("./data/contacts.json", "utf-8"));
    return file;
}

const findFile = (nama) => {
    let file = JSON.parse(fs.readFileSync("./data/contacts.json", "utf-8"));
    let found = file.find((data) => data.nama === nama)
    return found
}

const deleteList = (nama) =>{
    let file = JSON.parse(fs.readFileSync("./contacts.json", "utf-8"));
    file.forEach((element, i) => {
        if(element.nama === nama){
            file.splice(i, 1);
            fs.writeFileSync("./contacts.json", JSON.stringify(file));
            console.log(chalk `{bgRed.black ${element.nama} telah di hapus dari daftar contact}`);
        }
    });
}


module.exports = {simpanContact, tampilList, deleteList, findFile};