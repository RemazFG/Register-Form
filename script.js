const form = document.getElementById("register-form");
const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const age = document.getElementById("age");
const terms = document.getElementById("terms");
const submitButton = document.getElementById("submit-btn");
const formStatus = document.getElementById("form-status");

//import password rules
const passwordRules = {
    length: document.getElementById("rule-length"),
    upper: document.getElementById("rule-upper"),
    number: document.getElementById("rule-number"),
};

//show error message
function showError(input, errorId, message = "") {
    const error = document.getElementById(errorId);
    error.textContent = message;

    input.classList.toggle("invalid", message !== "");
    input.classList.toggle("valid", message === "" && input.value !== "");

}

//name validation 
function isValidFullname() {
    const name = fullname.value.trim();
    if (name.length < 2) {
        showError(fullname, "fullname-error", "Enter your full name");
        return false;
    } else {
        showError(fullname, "fullname-error", "");
        return true;
    }
}
//email validatiion
function isValidEmail() {
    const userEmail = email.value.trim();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ;
    if(!emailPattern.test(userEmail)){
        showError(email, "email-error", "Enter a valid Email");
        return false;
    } else {
        showError(email, "email-error", "");
        return true;
    }
}

//password validation 
function isValidPassword() {
    const passwordValue = password.value;

    const rules = {
        length: passwordValue.length >= 8,
        upper: /[A-Z]/.test(passwordValue),
        number: /[0-9]/.test(passwordValue),
    }

    Object.keys(rules).forEach(element => {
        passwordRules[element].classList.toggle("met", rules[element]);     
    });

    return Object.values(rules).every(Boolean);
}
//confirm password
function isPasswordConfirmed(){
    const confirmPasswordValue = confirmPassword.value;
    const passwordValue = password.value;

    if(confirmPasswordValue === ""){
        showError(confirmPassword, "confirm-password-error", "Can not be empty");
        return false
    }if (confirmPasswordValue !== passwordValue){
        showError(confirmPassword, "confirm-password-error", "Your passwords don't Match");
        return false;
    }
    showError(confirmPassword, "confirm-password-error");
    return true;
}

//age check
function isValidAge(){
    const ageValue = Number(age.value);
    
    if (age.value === "" || ageValue < 18 || ageValue > 80) {
    showError(age, "age-error", "Age must be between 18 and 80");
    return false;
    }
    showError(age, "age-error");
    return true;
}

//terms check
function isTermsAccepted(){
    const termsValue = terms.checked;
    if(!termsValue){
        showError(terms, "terms-error", "Must be checked");
        return false;
    }
    showError(terms, "terms-error", "");
        return true;
}

function validateForm() {
    const results = [
        isValidFullname(),
        isValidEmail(),
        isValidPassword(),
        isPasswordConfirmed(),
        isValidAge(),
        isTermsAccepted()
    ];
    const formValid = results.every(Boolean);
    submitButton.disabled = !formValid;
    return formValid;
}

form.addEventListener("input", validateForm);
form.addEventListener("change", validateForm);//evry time user write ckeck 

form.addEventListener("submit", function(event){
    event.preventDefault;
    if(!validateForm()){
        formStatus.textContent = "Please fix the highlighted fields";
        formStatus.classList.remove("success");
        return ;
    }
    formStatus.textContent = `Welcome ${fullname.value.trim()}, Your account was created`;;
    formStatus.classList.add("success");


    form.reset();
    validateForm();

})
