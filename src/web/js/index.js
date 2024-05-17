const emailInput = document.getElementById("email-input");
const emailSubmitButton = document.getElementById("email-submit");
const validEmailDisplay = document.getElementById("valid-email");
const invalidEmailDisplay = document.getElementById("invalid-email");
const emailSubmit = document.getElementById("email-submit");
const sendingSpinner = document.getElementById("sending-spinner");

const verificationModal = new bootstrap.Modal(document.getElementById("verification-modal"));
const verificationEmailPlaceholder = document.getElementById("verification-email-placeholder");

const verificationCodeInput = document.getElementById("verification-code-input");
const invalidVerificationCodeDisplay = document.getElementById("invalid-verification-code");
const verificationCodeSubmit = document.getElementById("verification-code-submit");

const successModal = new bootstrap.Modal(document.getElementById("success-modal"));

const emailRegex = new RegExp("[A-Za-z0-9\._%+\\-]+@[A-Za-z0-9\.\\-]+\\.[A-Za-z]{2,}");
const emailSentText = "We have sent a verification code to \"$EMAIL$\".";

let verificationCode = "test";

function checkEmail() {
    let input = emailInput.value;

    if (emailRegex.test(input)) {
        validEmail();
    } else {
        invalidEmail();
    }
}

function validEmail() {
    emailSubmitButton.removeAttribute("disabled")
    validEmailDisplay.classList.remove("invisible")
    invalidEmailDisplay.classList.add("invisible")
}

function invalidEmail() {
    emailSubmitButton.setAttribute("disabled", true);
    invalidEmailDisplay.classList.remove("invisible")
    validEmailDisplay.classList.add("invisible")
}

function sendVerification() {
    emailSubmitButton.setAttribute("disabled", true);
    emailSubmitButton.classList.add("invisible");
    sendingSpinner.classList.remove("invisible");

    let email = emailInput.value.trim();

    const requestBody = {
        email: email,
        verification_code_length: 10,
        html: "<p>Here is your verification code: ${verification_code}</p>"
    }

    fetch("http://127.0.0.1:3030/verify", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    }).then(res => res.json())
        .then(data => {
            console.log(data)
            verificationCode = data.verification_code;

            verificationEmailPlaceholder.innerHTML = emailSentText.replace("$EMAIL$", email);

            verificationModal.show();
        })
        .catch(err => {
            displayError(err);
            console.log(err);
        });
}



function checkVerificationCode() {
    let input = verificationCodeInput.value.trim();

    if (input === verificationCode) {
        validVerficationCode();
        resetFields();
    } else {
        invalidVerificationCode();
    }
}

function validVerficationCode() {
    verificationModal.hide();
    successModal.show();
}

function invalidVerificationCode() {
    invalidVerificationCodeDisplay.classList.remove("invisible")
}

function resetFields() {
    emailInput.value = "";
    verificationCodeInput.value = "";

    invalidEmailDisplay.classList.add("invisible");
    validEmailDisplay.classList.add("invisible");
    emailSubmitButton.removeAttribute("disabled");
    emailSubmitButton.classList.remove("invisible");
    sendingSpinner.classList.add("invisible");

    invalidVerificationCodeDisplay.classList.add("invisible");
}

function displayError(error) {
    window.alert("An error occurred: " + error.message);
}

verificationCodeSubmit.addEventListener("click", function () {
    checkVerificationCode();
});

emailSubmit.addEventListener("click", function () {
    sendVerification();
});

emailInput.addEventListener('input', function () {
    checkEmail();
});
