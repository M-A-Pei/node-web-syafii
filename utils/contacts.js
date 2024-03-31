const fs = require("fs");
const validator = require('validator');
const notifier = require('node-notifier');

if(!fs.existsSync("./data")){
    fs.mkdirSync("./data");
}

if(!fs.existsSync("./data/contacts.json")){
    fs.writeFileSync("./data/contacts.json", "[]");
}

const simpanContact = (data) => {
    let file = JSON.parse(fs.readFileSync("./data/contacts.json", "utf-8"));
    let duplikat = file.find((contacts)=>{return contacts.email === data.email});

    if(!validator.isEmail(data.email)){
        notifier.notify({
            title: 'this is not an email',
            message: 'next time, enter in a real one',
            sound: true,
            wait: true
          })
        return false
    }

    if(duplikat) {
        notifier.notify({
            title: 'this email is already used',
            message: 'next time, use your own email',
            sound: true,
            wait: true
          })
        return false;
    }


    file.push(data);
    notifier.notify({
        title: 'success',
        message: 'your data was successfully inserted!',
        sound: true,
        wait: true
      })
    fs.writeFileSync("./data/contacts.json", JSON.stringify(file));
    return true;
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