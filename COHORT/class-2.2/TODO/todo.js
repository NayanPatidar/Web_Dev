const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
const port = 3000;

let data = [ 
    {"title": "Buy groceries", "completed": false, description: "I should buy groceries", id: 1},
    {"title": "Dance", "completed": true, description: "I should enjoy for 30 min", id: 2},    
];

app.get('/todos', (req, res) => {
    res.send(data);
});

app.post('/todos', (req, res) => {

    let valid = postTodoAnalyser(req.body);
    if (valid){
        res.status(201).json({id: data.length+1});
    }
    req.body.id = data.length+1;
    data.push(req.body);
})


app.listen(port, () => {
    console.log(`Server is running on the port ${port}`);
})

function postTodoAnalyser(todo){
    if( todo.title != "" && todo.description != "" ){
        console.log("Valid Todo");
        return true;
    }
    return false;
}