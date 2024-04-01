//buat jalanin nodemon:
//powershell -ExecutionPolicy Bypass -File (nama lengkap file)

const express = require('express')
const {body, check, validationResult} = require('express-validator')
const os = require('os')
const path = require('path')
const contact = require('./utils/contacts')
const expressEjsLayouts = require('express-ejs-layouts')
const { error } = require('console')
const app = express()
const port = 3000

app.set("view engine", "ejs")
app.use(expressEjsLayouts)
app.use(express.urlencoded({ extended: true }))
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap-icons/font')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

app.get('/', (req, res) => {
    res.render("index", {nama: os.userInfo().username, layout:"layouts/main"})
})
app.get('/about', (req, res) => {
    res.render("about", {layout:"layouts/main"})
})

app.get('/contact', (req, res) => {
    const orang = contact.tampilList();
    res.render("contact", {orang, layout:"layouts/main"})
})

app.get('/contact/delete/:email', (req, res) => {
    contact.deleteList(req.params.email);
    const orang = contact.tampilList();
    res.render("contact", {orang, layout:"layouts/main"})
})

app.get('/contact/:email', (req, res) => {
    const x = contact.findFile(req.params.email);
    res.render("detail", {layout:"layouts/main", x})
})

app.post('/contact', 
    body('email', "this isnt an email!").isEmail(),
    body('no', "this isnt an indonesian number!").isMobilePhone('id-ID'),
    body('umur', "your age cant be a negative!").isNumeric({no_symbols: true}),
    body('email').custom((v) => {
        if(contact.duplikat(v)){
            throw new Error ("email ini sudah ada!");
        }
        return true;
    }),
    (req, res) => {
    let error = validationResult(req);
    if(!error.isEmpty()){
        const orang = contact.tampilList();
        res.render("contact", {orang, error: error.array(), layout:"layouts/main"})
    }else{
        contact.simpanContact(req.body);
        const orang = contact.tampilList();
        res.render("contact", {orang, error: error.array(), layout:"layouts/main"})
    }

})

app.listen(port, ()=>{
    console.log(`listening on port ${port}...`);
})

