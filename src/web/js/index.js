const emailInput = document.getElementById("email-input");
const emailSubmitButton = document.getElementById("email-submit");
const validEmailDisplay = document.getElementById("valid-email")
const invalidEmailDisplay = document.getElementById("invalid-email")

const emailRegex = new RegExp("[A-Za-z0-9\._%+\\-]+@[A-Za-z0-9\.\\-]+\\.[A-Za-z]{2,}")

let emailInputSelected = false;

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

window.addEventListener('keyup', function () {
    if(emailInputSelected) {
        checkEmail();
    }
});

emailInput.addEventListener('focus', function () {
    emailInputSelected = true;
});

emailInput.addEventListener('blur', function () {
    emailInputSelected = false;
});