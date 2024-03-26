//buat jalanin nodemon:
//powershell -ExecutionPolicy Bypass -File (nama lengkap file)

const express = require('express')
const app = express()
const port = 3000
const os = require('os');

app.set("view engine", "ejs")

const orang = [
    {
        nama: "syafii",
        umur: 17
    },
    {
        nama: "hamzah",
        umur: 16
    }
]

app.get('/', function (req, res) {
    res.render("index", {nama: os.userInfo().username})
})
app.get('/about', function (req, res) {
    res.render("about")
})
app.get('/contact', function (req, res) {
    res.render("contact", {orang})
})

app.listen(port, ()=>{
    console.log(`listening on port ${port}...`);
})