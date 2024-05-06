const nodemailer = require("nodemailer");
require("dotenv").config({path: './auth.env'});
const emailTemplate = require("./packets.js").emailTemplate;


// Function to send an email
class Mailer {
  mail;
  #transporter;

  constructor(mail) {
    this.mail = mail;
    this.#initTransporter();
    
  }

  #initTransporter() {
    this.checkDotenv();
    const transporter = {
      host: process.env.host,
  
      secureConnection: process.env.secureConnection,
      port: process.env.port,
      auth: {
        user: process.env.user,
        pass: process.env.password
      },
      tls: {
        ciphers:'SSLv3',
        rejectUnauthorized: process.env.rejectUnauthorized,
     },
    }
    if (process.env.service !== "") {
      transporter.service = process.env.service;
    }
    if (process.env.secure !== "") {
      transporter.secure = process.env.secure;
    }

    this.#transporter = nodemailer.createTransport(transporter);
  }

  async sendMail(email) {
    try {
      const emailToSend = this.#mapRequestToEmail(email);
      const mailRes = await this.#transporter.sendMail(emailToSend);
      return mailRes;
    } catch(err) {
      throw err;

    }
  }

  #mapRequestToEmail(request) {
    const returnEmail = {...emailTemplate};
    returnEmail.from = `"${process.env.display_name}" <${process.env.user}>`;
    returnEmail.to = request.email;
    returnEmail.cc = request.cc;
    returnEmail.bcc = request.bcc;
    returnEmail.subject = request.subject;
    returnEmail.text = request.text;
    returnEmail.html = request.html;
    return returnEmail;
  }

  checkDotenv() {
    
    let exit = false;
    if (isNaN(process.env.apiPort)) {
      console.log(`Please change the apiPort variable in the auth.env file to a valid number.`);
      exit = true;
  }
  if (Number(process.env.apiPort) < 1 || Number(process.env.apiPort) > 65535) {
    console.log(`Please change the apiPort variable in the auth.env file to a valid port. See https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers`);
    exit = true;
}
    if (process.env.host === "put_email_host_here") {
        console.log(`Please change the host variable in the auth.env file.`);
        exit = true;
    }
    if (isNaN(process.env.port)) {
        console.log(`Please change the port variable in the auth.env file to a valid number.`);
        exit = true;
    }
    if (Number(process.env.port) < 1 || Number(process.env.port) > 65535) {
        console.log(`Please change the port variable in the auth.env file to a valid port. See https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers`);
        exit = true;
    }
    if (process.env.service === "put_email_service_here") {
        console.log(`Please change the service variable in the auth.env file.`);
        exit = true;
    }
    

    if (!((process.env.secure).toLowerCase() === "true" || (process.env.secure).toLowerCase() === "false" || process.env.secure === "")){
        console.log(`Please change the secure variable in the auth.env file to a valid boolean (true or false) or leave it blank (recommended).`);
        exit = true;
    }
    if (!((process.env.secureConnection).toLowerCase() === "true" || (process.env.secureConnection).toLowerCase() === "false")){
      console.log(`Please change the secureConnection variable in the auth.env file to a valid boolean. (true or false)`);
      exit = true;
  }
  if (!((process.env.rejectUnauthorized).toLowerCase() === "true" || (process.env.rejectUnauthorized).toLowerCase() === "false")){
    console.log(`Please change the rejectUnauthorized variable in the auth.env file to a valid boolean. (true or false)`);
    exit = true;
}

  
  if (process.env.display_name === "put_your_display_name_here") {
    console.log(`Please change the display_name variable in the auth.env file.`);
    exit = true;
}
    if (process.env.user === "put_your_email_here") {
        console.log(`Please change the user variable in the auth.env file.`);
        exit = true;
    }
    if (process.env.password === "put_your_password_here") {
        console.log(`Please change the password variable in the auth.env file.`);
        exit = true;
    }
    if (exit) {
        process.exit(1);
    }
  }
    
}




module.exports = Mailer;
