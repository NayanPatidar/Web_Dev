const express = require('express');
const bodyParse = require('body-parser');
const app = express();

app.use(bodyParse.json());

let data = [];

app.post("/", (req, res) => {
    const incomingData = req.body;
    // console.log(`Name is ${dataFromBody.Name}, Health is ${dataFromBody.Health}, Number of Kidneys is ${dataFromBody.Kidneys}`);
    if (checkForDuplicateData(incomingData) === true){
        console.log("Data Pushed!");
        data.push(incomingData);
    }
    res.send('Data Received Successfully !!');
})

app.get('/', (req, res) => {
    res.json(data);
})

app.put('/', (req, res) => {
    const incomingDataToUpdate = req.body;
    if (updateData(incomingDataToUpdate)){
        res.send("Data  Updated Successfully !!");
    } else {
        res.send("Data Update is Unsuccessfull !!")
    }
})

app.listen(3000);

function checkForDuplicateData(incomingData){
    if (data.some((element) => element.Name === incomingData.Name)) {
        console.log(`Patient is present : ${incomingData.Name}`);
        return false;;
    }
    return true;
}

function updateData(dataToUpdate) {
    let updated = false;
    data.forEach((element) => {
        if (element.Name === dataToUpdate.Name) {
            element.Health = dataToUpdate.Health;
            element.Kidney = dataToUpdate.Kidney;
            console.log("Updating Things");
            updated = true;
        }
    });
    return updated;
}

