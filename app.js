//buat jalanin nodemon:
//powershell -ExecutionPolicy Bypass -File (nama lengkap file)

const express = require('express')
const os = require('os')
const path = require('path')
const contact = require('./utils/contacts')
const expressEjsLayouts = require('express-ejs-layouts')
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

app.get('/contact/:nama', (req, res) => {
    const x = contact.findFile(req.params.nama);
    res.render("detail", {layout:"layouts/main", x})
})

app.post('/contact', (req, res) => {
   let z = contact.simpanContact(req.body);
   const orang = contact.tampilList();
   res.render("contact", {orang, layout:"layouts/main"})
})

app.listen(port, ()=>{
    console.log(`listening on port ${port}...`);
})


//ReferenceError: Cannot access 'contact' before initialization
// at C:\syafii\node-web-syafii\app.js:33:21
// at Layer.handle [as handle_request] (C:\syafii\node-web-syafii\node_modules\express\lib\router\layer.js:95:5)
// at next (C:\syafii\node-web-syafii\node_modules\express\lib\router\route.js:149:13)
// at Route.dispatch (C:\syafii\node-web-syafii\node_modules\express\lib\router\route.js:119:3)
// at Layer.handle [as handle_request] (C:\syafii\node-web-syafii\node_modules\express\lib\router\layer.js:95:5)
// at C:\syafii\node-web-syafii\node_modules\express\lib\router\index.js:284:15
// at param (C:\syafii\node-web-syafii\node_modules\express\lib\router\index.js:365:14)
// at param (C:\syafii\node-web-syafii\node_modules\express\lib\router\index.js:376:14)
// at Function.process_params (C:\syafii\node-web-syafii\node_modules\express\lib\router\index.js:421:3)
// at next (C:\syafii\node-web-syafii\node_modules\express\lib\router\index.js:280:10)

