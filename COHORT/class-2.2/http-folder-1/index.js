const express = require('express');
const bodyParser = require('body-parser');
const process = express();

process.use(bodyParser.json());

process.get('/', (req, res) => {
    res.send('<h1>Yooo</h1>');
    console.log(req.body);
});

process.listen(8085, function() {
    console.log(`Listening on port 8085`);
});
