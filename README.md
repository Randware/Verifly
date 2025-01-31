<img align="left" width="300" src="https://raw.githubusercontent.com/Randware/Verifly/main/.github/img/verifly-logo%20(by%20Hadi%20Sadik).png" alt="The Verifly logo">

## Verifly
---
An open-source, self-hosted API solution for email verification.

Verifly creates an API endpoint, which can be used to request a random verification code and send it to the specified email afterwards.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

<sub><i>Logo by Hadi Sadik</i></sub>

<br clear="left"/>

### Installation

#### The installation guide for Verifly

1. Clone the repository

    ```bash
    cd desired/target/directory
    git clone https://github.com/Randware/Verifly
    ```
2. Install the dependencies 

    ```bash
    npm install
    ```
3. Modify the auth.env configuration file
   
    Update the authentication credentials to enable sending emails.  
    See the documentation of the [Environment Variables](#environment-variables-refrence)
    
4. Run the api in the directory with the repository

    ```bash
    npm run
    ```

## Environment Variables Refrence

All of these variables are for the nodemailer dependencies.  
For detailed descriptions of all variables, head to: 
https://nodemailer.com/smtp/

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `apiPort` | `integer` |  the port on which the API runs |
| `host` | `string` |  the smtp host (smtp.example.com) |
| `port` | `integer` | the host port to connect to |
| `service` | `string` | the service of your email. Leave blank if you have a host address|
| `secure` | `boolean` | enable or disable the use of SSL (leave blank if you don't know what you do) |
| `secureConnection` | `boolean` | enforce the use of TSL |
| `rejectUnauthorized` | `boolean` |  allows TLS server with self-signed or invalid TLS certificate |
| `display_name` | `string` |  the display name of the sender |
| `user` | `string` | the email (username) of the sender |
| `password` | `string` | the password of the given email |


### Auth.env examples

Here is an auth.env example for [Outlook](https://outlook.com/):
```env
apiPort=3030
host="smtp-mail.outlook.com"
port=587
service=""
secure=
secureConnection=false
rejectUnauthorized=false
display_name="Verifly"
user="example@outlook.com"
password="password"

```

An example for [Mailtrap](https://mailtrap.io/)  
```env
apiPort=3030
host="sandbox.smtp.mailtrap.io"
port=2525
service=""
secure=
secureConnection=false
rejectUnauthorized=false
display_name="Verifly"
user="0d4f******"
password="c0629*****"
```

An example for [MailerSend](https://www.mailersend.com/)
```env
apiPort=3030
host="smtp.mailersend.net"
port=587
service=""
secure=
secureConnection=false
rejectUnauthorized=false
display_name="Verifly"
user="ex_ample@trial-XXX.mlsender.net"
password="gGHqZR9t*******"

```

## API Reference

#### Send the verification code

```http
  POST /verify
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required** The recipient's email |
| `subject` | `string` | subject of the email |
| `html` | `string` | your html styled text content (use if possible)|
| `text` | `string` | plain text content of the email |
| `from` | `string` |  "_display_name_ < _your@mail.com_ >" (not recommended) |
| `cc` | `string` |  the cc for the mail |
| `bcc` | `string` | the cc for the mail |
| `verification_code_length` | `integer` | the lengh of the verification code |
| `verification_code` | `string` | your own custom verification code, if desired |
| `verification_code_special_chars` | `boolean` | include special characters in verification code |

## Placeholder Reference

| Placeholder             | Description                                                                |
| ----------------- | ------------------------------------------------------------------ |
| ${verification_code} | the placeholder for the verification code |
| ${emailTo} | the recipient email |
| ${emailFrom} | the sender email |
| ${display_name} | the sender display name |


## Examples

```javascript
const requestBody = {
    email: "example@mail.com",
    verification_code_length: 10,
    html: "<p>Here is your verification code: ${verification_code}<p>"
}

fetch("http://urlToApi.com/verify", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
})  .then(res => res.json()) /
    .then(data => console.log(data))
    .catch(err => console.log(err));
```

## FAQ

#### Q: The "git clone" command was not found

**A:** If you get this error when trying to run ```git clone```, it is likely because git is not installed.  
To install git, follow this guide:
https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

#### Q: The "npm" command was not found

**A:** If you get this error when trying to run ```npm install```, it is likely because npm is not installed.  
To install npm, follow this guide:  
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

#### Q: I have another issue

**A:** If you have another issue related to Verifly, feel free to open an issue on:  
https://github.com/Randware/Verifly/issues

## Authors

- [@Dari-OS](https://www.github.com/Dari-OS)
- [@GHaxZ](https://www.github.com/GHaxZ)


