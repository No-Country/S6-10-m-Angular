const whatsappModel = require("./whatsappmodels");
const whatsappService = require("../services/whatsappService");

function Process(textUser, number){
    const model = whatsappModel.MessageText(textUser, number);
    whatsappService.SendMessageWhatsApp(model);
}

function firstProcess(number){
    const model = whatsappModel.firstMessageText(number);
    whatsappService.SendMessageWhatsApp(model);
}
module.exports = {
    Process,
    firstProcess
};