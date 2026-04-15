import validator from "validator";

const emailValidator = (emailId) => {
    if(!validator.isEmail(emailId)){
        throw new Error("Email id is invalid");
    }
}

const passwordValidator = (password) => {
    if(!validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })){
        throw new Error("Password is not strong enough");
    }
}

export default { emailValidator, passwordValidator };