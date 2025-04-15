const express = require('express');
const connection = require('./database/database');
const bodyParser = require('body-parser');

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

connection.authenticate().then(()=>{
    console.log("Database acessed")
}).catch((err)=>{
    console.log("err: " + err);
});

app.get('/', (req,res)=>{
    res.render('index');
})

app.listen(8080, ()=>{
    console.log('Server Running!')
})