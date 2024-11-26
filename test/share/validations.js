class Validator {
    static hasUnsafeCharacters(input) {
        const regex = /['"\\;\-@]/;
        return regex.test(input);
    }

    static isValidLength(str, minLength, maxLength) {
        return typeof str === 'string' && str.length >= minLength && str.length <= maxLength;
    }

    static validateCategoryName(name) {
        return this.isValidLength(name, 1, 50) && !this.hasUnsafeCharacters(name);
    }

    static validatePaymentMethodName(name) {
        return this.isValidLength(name, 1, 30) && !this.hasUnsafeCharacters(name);
    }

    static validateOrderStatusName(name) {
        return this.isValidLength(name, 1, 30) && !this.hasUnsafeCharacters(name);
    }

    static validatePreparationAreaName(name) {
        return this.isValidLength(name, 1, 30) && !this.hasUnsafeCharacters(name);
    }

    static validateDiscountType(type) {
        const validTypes = ['percentage', 'fixed'];
        return typeof type === 'string' && !this.hasUnsafeCharacters(type) && validTypes.includes(type);
    }

    static validateDiscountValue(value) {
        return typeof value === 'number' && value >= 0 && value <= 999.99;
    }

    static validateDate(date) {

        // Declarar la función interna
        function hasUnsafeCharactersDate(input) {
            const regex = /['"\\;\@]/;
            return regex.test(input);
        }
    
        // Validar la fecha y los caracteres no seguros
        if (typeof date !== 'string' || hasUnsafeCharactersDate(date)) return false;
    
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(date) && !isNaN(new Date(date).getTime());
    }
    
    
    static validateTimestamp(timestamp) {
        return typeof timestamp === 'string' && !this.hasUnsafeCharacters(timestamp) && !isNaN(Date.parse(timestamp));
    }

    static validateTextField(text) {
        return typeof text === 'string' && text.trim().length > 0 && !this.hasUnsafeCharacters(text);
    }

    static validatePrice(price) {
        return typeof price === 'number' && price >= 0 && price <= 99999.99;
    }

    static validateRating(rating) {
        return Number.isInteger(rating) && rating >= 1 && rating <= 5;
    }

    static validateUserType(type) {
        const validTypes = ['client', 'worker'];
        return typeof type === 'string' && !this.hasUnsafeCharacters(type) && validTypes.includes(type);
    }

    static validateEmail(email) {
        if (typeof email !== 'string') return false; // Verifica que sea una cadena
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Patrón para correos válidos
        return regex.test(email); // Verifica el formato del correo
    }
    

    static validatePhone(phone) {
        if (phone && (typeof phone !== 'string' || this.hasUnsafeCharacters(phone))) return false;
        const regex = /^[0-9]{10}$/;
        return !phone || regex.test(phone);
    }

    static validatePassword(password) {
        return typeof password === 'string' &&
            password.length >= 8 && // Mínimo 8 caracteres
            /[A-Za-z]/.test(password) && // Al menos una letra
            /\d/.test(password) && // Al menos un número
            /[!@#$%^&*(),.?":{}|<>]/.test(password); // Al menos un carácter especial
    }
    

    static validateTime(time) {
        return typeof time === 'string' && !this.hasUnsafeCharacters(time) && /^([0-1]\d|2[0-3]):([0-5]\d)$/.test(time);
    }

    static validateBoolean(value) {
        return typeof value === 'boolean';
    }

    static validateInteger(value) {
        if(value<0){
            return false;
        }

        return Number.isInteger(value);
    }

    static validatePoints(points) {
        return Number.isInteger(points) && points >= 0;
    }

    static validateTextWithSpecialChars(text) {
        return typeof text === 'string' && text.length > 0 && !this.hasUnsafeCharacters(text);
    }
}

export default Validator;
