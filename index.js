const express = require('express');
const connection = require('./database/database');

const app = express();

connection.authenticate().then(()=>{
    console.log("Database acessed")
}).catch((err)=>{
    console.log("err: " + err);
});

app.listen(8080, ()=>{
    console.log('Server Running!')
})