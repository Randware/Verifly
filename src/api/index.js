const Mailer = require("./mailer.js");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
require("dotenv").config({path: './auth.env'});
let port = process.env.apiPort;
const verificationCodeChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*()-_=+[]{}\\|;:\",<.>/?";
const responseErrorTemplate = require("./packets.js").responseErrorTemplate;
const responseTemplate = require("./packets.js").responseTemplate;
const requestTemplate = require("./packets.js").requestTemplate;
const Placeholder = require('./placeholder.js');
const mailer = new Mailer();


app.use(cors());
app.use(bodyParser.json());

app.post('/verify', async (req, res) => {
    let errorCode = 422;
    let currentResponse = { ...responseTemplate };
    let currentRequest = { ...requestTemplate };
    let currentErrorResponse = { ...responseErrorTemplate };
    
    try {
    if (req.body["email"] === undefined) {
        currentErrorResponse.error_code = 422;
        currentErrorResponse.error_message = "An email has to be provided!";
        res.status(422).json(currentErrorResponse);
        return;
    } else {
        currentRequest.email = req.body["email"];
        
    }
    if (req.body["from"] === undefined) {
        currentRequest.from = requestTemplate.from;
    } else {
        currentRequest.from = req.body["from"];
    }
    
    if (req.body["cc"] === undefined) {
        currentRequest.cc = requestTemplate.cc;
    } else {
        currentRequest.cc = req.body["cc"];
    }
    if (req.body["bcc"] === undefined) {
        currentRequest.bcc = requestTemplate.bcc;
    } else {
        currentRequest.bcc = req.body["bcc"];
    }
    if (req.body["verification_code_length"] < 1) {
        currentRequest.verification_code_length = requestTemplate.verification_code_length; //Sets the verifcation code length to the default value from the packets file
    } else {
        currentRequest.verification_code_length = req.body["verification_code_length"];
    }
    if (!(req.body["verification_code_special_chars"] === true || req.body["verification_code_special_chars"] === false)) {
        currentRequest.verification_code_special_chars = requestTemplate.verification_code_special_chars;
    } else {
        currentRequest.verification_code_special_chars = req.body["verification_code_special_chars"];
    }
    if (req.body["verification_code"]  === undefined) {
        currentRequest.verification_code = randomString(currentRequest.verification_code_length, currentRequest.verification_code_special_chars);
    } else {
        currentRequest.verification_code = req.body["verification_code"] ;
    }
    if (req.body["subject"]  === undefined) {
        currentRequest.subject = requestTemplate.subject;
    } else {
        currentRequest.subject = req.body["subject"];
    }
    
    if (req.body["text"]  === undefined) {
        currentRequest.text = requestTemplate.text;
    } else {
        currentRequest.text = req.body["text"];
    }
    if (req.body["html"] === undefined) {
        currentRequest.html = requestTemplate.html;
    } else {
        currentRequest.html = req.body["html"];
    }
    currentRequest.email = Placeholder.mapPlaceholders(currentRequest.email, currentRequest.verification_code, currentRequest.email, process.env.user, process.env.display_name);
    currentRequest.cc = Placeholder.mapPlaceholders(currentRequest.cc, currentRequest.verification_code, currentRequest.email, process.env.user, process.env.display_name);
    currentRequest.bcc = Placeholder.mapPlaceholders(currentRequest.bcc, currentRequest.verification_code, currentRequest.email, process.env.user, process.env.display_name);
    currentRequest.text = Placeholder.mapPlaceholders(currentRequest.text, currentRequest.verification_code, currentRequest.email, process.env.user, process.env.display_name);
    currentRequest.subject = Placeholder.mapPlaceholders(currentRequest.subject, currentRequest.verification_code, currentRequest.email, process.env.user, process.env.display_name);
    currentRequest.html = Placeholder.mapPlaceholders(currentRequest.html, currentRequest.verification_code, currentRequest.email, process.env.user, process.env.display_name);
    currentResponse.email = currentRequest["email"];
    currentResponse.verification_code = currentRequest.verification_code;
    const mailResponse = await mailer.sendMail(currentRequest);   
    
    

    res.json(currentResponse);
} catch(err) {
    currentErrorResponse.error_code = errorCode; //TODO The error code should not be always 422
    currentErrorResponse.error_message = err.message;
    res.status(422).json(currentErrorResponse);
    return;
}
})




app.listen(port, () => {
    console.log(`Starting api on Port ${port}`);
    mailer.checkDotenv();
});



function randomString(length, specialChars) {
if (!(specialChars === true || specialChars === false)) specialChars = false;
    const strLength = (specialChars) ? verificationCodeChars.length : verificationCodeChars.length - 30; //There are 30 special chars in the string
    if (!isNaN(length)) {
        let randomIString = "";
        for (let i = 0; i < length; i++) {
                randomIString += verificationCodeChars.charAt(Math.floor(Math.random() * strLength));
        }
        return randomIString;
    } 
}