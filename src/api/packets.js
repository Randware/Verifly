const requestTemplate = {
    from: "VerificationAPI",
    email: "test",
    cc: undefined,
    bcc: undefined,
    verification_code_length: 10,
    verification_code: undefined,
    verification_code_special_chars: false,
    subject: "Verification code",
    text: "The verification code is ${verification_code}", //${verification_code} Is the placeholder for the verification code. 
                                                         //${emailTo} is a placeholder for the person that should recive the email
                                                         //$${emailFrom} is a placeholder for the person that should send the email
    html: "<p>The <b>verification code</b> is ${verification_code}</p>"                                                     
}

const emailTemplate = {
        from: undefined,
        to: undefined,
        cc: undefined,
        bcc: undefined,
        subject: undefined,
        text: undefined,
        html: undefined,
        attachments: undefined,
}

const responseErrorTemplate = {
    error_code: 0,
    error_message: "Error"
};
const responseTemplate = {
    email: undefined,
    verification_code: undefined,
    
};

module.exports = {
    requestTemplate,
    emailTemplate,
    responseErrorTemplate,
    responseTemplate
};