//buat jalanin nodemon:
//powershell -ExecutionPolicy Bypass -File (nama lengkap file)

const express = require('express')
const expressEjsLayouts = require('express-ejs-layouts')
const app = express()
const port = 3000
const os = require('os');
const path = require('path')
const contact = require('./utils/contacts');

app.set("view engine", "ejs")
app.use(expressEjsLayouts)
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap-icons/font')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

const orang = contact.tampilList();

app.get('/', function (req, res) {
    res.render("index", {nama: os.userInfo().username, layout:"layouts/main"})
})
app.get('/about', function (req, res) {
    res.render("about", {layout:"layouts/main"})
})
app.get('/contact', function (req, res) {
    res.render("contact", {orang, layout:"layouts/main"})
})
app.get('/contact/:nama', (req, res) => {
    const nama = req.params.nama;
    res.render("detail", {layout: "layouts/main", nama})
})

app.listen(port, ()=>{
    console.log(`listening on port ${port}...`);
})
