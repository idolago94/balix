class ValidationService {

    signup(data) {
        let errors = [];
        errors.push(this.name(data.first_name, data.last_name));
        errors.push(this.email(data.email));
        errors.push(this.password(data.password, data.confirmPassword));
        errors.push(data.gender ? (null):('Gender not define.'));
        errors = errors.filter(err => err != null);
        if(errors.length > 0) {
            return errors;
        } else null;
    }

    name(first, last) {
        if(ONLY_CHARACTER.test(first) && ONLY_CHARACTER.test(last)) {
            return null;
        } return 'First name or last name not valid(only characters).';
    }

    username(str) {
        // no whitescpace
        if(NON_WHITESPACE.test(str)) {
            return null;
        } return 'Username not valid(whitespace not allowed).';
    }

    email(email) {
        if(EMAIL.test(email)) {
            return null;
        } return 'Email not valid.'
    }

    password(pass, confirm) {
        if(PASSWORD.test(pass)) {
            if(pass == confirm) {
                return null;
            } return 'Password not match.'
        } return 'Password not valid(at least one lowercase caracter, one number and minimum 8 characters).';
    }
}

export default new ValidationService();

const ONLY_CHARACTER = /^[a-zA-Z]+$/;
const NON_WHITESPACE = /^\S*$/;
const EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const MIN_CHAR = '(?=.{8,})';
const LEAST_1_NUMERIC = '(?=.*[0-9])';
const LEAST_1_LOWERCASE = '(?=.*[a-z])';
const PASSWORD = new RegExp(`^${MIN_CHAR}${LEAST_1_LOWERCASE}${LEAST_1_NUMERIC}`);