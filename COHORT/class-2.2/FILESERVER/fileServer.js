const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8080;

let files = [];

app.get('/files', (req, res) => {
    getFilesName()
        .then(data => {
            res.status(200).send(data)
        })
})

app.get('/file/:filename', (req, res) => {
    const fileName = req.params.filename;
    getFileData(fileName)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(400).send("File not found");
        });
})

app.listen(port, ()=> {
    console.log(`Listening on the port ${port}`);
})



// FS Functions

 function getFilesName(){
    return new Promise (function(resolve, reject) {
        fs.readdir('FILES', (err,data) => {
            if(err){
                reject(err)
                return;
            }
            resolve(data);
        })
    })
}

function getFileData(fileName){
    return new Promise(function(resolve, reject) {
        fs.readFile(`FILES/${fileName}`, 'utf-8', (err, data) => {
            if(err){
                reject(err);
                return;
            }
            resolve(data);
        })
    })
}