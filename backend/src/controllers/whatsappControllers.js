const fs = require("fs");

const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
const processMessage = require("../shared/processMessage");


const SendMessage = (req, res) => {
    try{
        const text = "*RECORDATORIO:* HUGO, hoy tiene una cita a las 3pm en el consultorio 552"
        const number = "51940179987"

        processMessage.Process(text, number);
        res.send("EVENT_RECEIVED");
    }
    catch(e){
        myConsole.log(e);
        res.send("EVENT_RECEIVED");
    }
}

const sendTemplateMessage = (req, res) => {
    try{
        const number = "51940179987"

        processMessage.firstProcess(number);
        res.send("EVENT_RECEIVED");
    }
    catch(e){
        myConsole.log(e);
        res.send("EVENT_RECEIVED");
    }
}

module.exports = {
    SendMessage,
    sendTemplateMessage
}
