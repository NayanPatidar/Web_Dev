const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

let files = [];

fs.readdir('FILES', (err, data) => {
    if(err){
        console.error(err);
        return;
    }
    files.push(data);
    console.log(files);
})