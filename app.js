// const http = require("http");

// http.
//     createServer((req, res)=>{
//         res.writeHead(200, {
//             'Content-Type': 'text/html'
//         });

//         const url = req.url;

//         switch(url){
//             case '/':
//                 res.write("hey guys, this is a web server");
//                 res.end();
//                 break;
//             case '/about':
//                 res.write("hey guys, this is the about page");
//                 res.end();
//                 break;
//         }

//         console.log(url);
//         res.end();
//     }).
//     listen(3000, () => {
//         console.log("node is listening on port 3000...")
//     })

const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)