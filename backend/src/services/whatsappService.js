// const fs = require("fs");

// const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
const https = require("https");
require('dotenv').config()

function SendMessageWhatsApp(data){
    
    const options = {
        host: "graph.facebook.com",
        // path: process.env.PATH,
        path: '/v15.0/101918129491323/messages',
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.TOKEN}`
            
        }
    };
    const req = https.request(options, res => {
        res.on("data", d=> {
            process.stdout.write(d);
        });
    });

    req.on("error", error => {
        console.error(error);
    });

    req.write(data);
    req.end();
}

module.exports = {
    SendMessageWhatsApp
};