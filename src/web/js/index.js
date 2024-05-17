const emailInput = document.getElementById("email-input");
const emailSubmitButton = document.getElementById("email-submit");
const validEmailDisplay = document.getElementById("valid-email");
const invalidEmailDisplay = document.getElementById("invalid-email");
const emailSubmit = document.getElementById("email-submit");

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

    if(emailRegex.test(input)) {
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
    let email = emailInput.value.trim();

    verificationEmailPlaceholder.innerHTML = emailSentText.replace("$EMAIL$", email);

    verificationModal.show();

    return;

    const requestBody = {
        email: email,
        verification_code_length: 10,
        html: "<p>Here is your verification code: ${verification_code}</p>"
    }

    fetch("http://localhost:3030", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    }).then(res => res.json())
        .then(data => {
            verificationCode = data.verification_code;
        })
        .catch(err => {
            displayError(err);
            console.log(err);
        });
}

function checkVerificationCode() {
    let input = verificationCodeInput.value.trim();

    if(input === verificationCode) {
        validVerficationCode();
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

function displayError(error) {
    window.alert("An error occurred: " + error.message);
}

verificationCodeSubmit.addEventListener("click", function () {
    checkVerificationCode();
});

emailSubmit.addEventListener("click", function() {
    sendVerification();
});

emailInput.addEventListener('input', function () {
    checkEmail();
});
