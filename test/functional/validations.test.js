import { expect } from 'chai';
import Validator from '../../share/validations.js';

describe('Validation Functions', () => {
    describe('SQL Injection Prevention (hasUnsafeCharacters)', () => {
        it('should return true if input contains single quotes', () => {
            expect(Validator.hasUnsafeCharacters("O'Reilly")).to.be.true;
        });
        it('should return true if input contains double quotes', () => {
            expect(Validator.hasUnsafeCharacters('He said "Hello"')).to.be.true;
        });
        it('should return true if input contains backslash', () => {
            expect(Validator.hasUnsafeCharacters('C:\\Windows')).to.be.true;
        });
        it('should return true if input contains semicolon', () => {
            expect(Validator.hasUnsafeCharacters('DROP TABLE users;')).to.be.true;
        });
        it('should return true if input contains double dash', () => {
            expect(Validator.hasUnsafeCharacters('SELECT * FROM users --')).to.be.true;
        });
        it('should return false for safe input', () => {
            expect(Validator.hasUnsafeCharacters('SafeInput123')).to.be.false;
        });
    });

    // Category Name Validation
    describe('Category Name Validation', () => {
        it('should return true for a valid category name', () => {
            expect(Validator.validateCategoryName('Desserts')).to.be.true;
        });
        it('should return false for a name with special characters', () => {
            expect(Validator.validateCategoryName("Cakes@2024")).to.be.false;
        });
        it('should return false for an empty string', () => {
            expect(Validator.validateCategoryName('')).to.be.false;
        });
        it('should return false for a name exceeding 50 characters', () => {
            expect(Validator.validateCategoryName('a'.repeat(51))).to.be.false;
        });
        it('should return true for a name with exactly 50 characters', () => {
            expect(Validator.validateCategoryName('a'.repeat(50))).to.be.true;
        });
    });

    // Email Validation
    describe('Email Validation', () => {
        it('should return true for a valid email address', () => {
            expect(Validator.validateEmail('test@example.com')).to.be.true;
        });
        it('should return false for an email without "@"', () => {
            expect(Validator.validateEmail('testexample.com')).to.be.false;
        });
        it('should return false for an email without domain', () => {
            expect(Validator.validateEmail('test@.com')).to.be.false;
        });
        it('should return false for an email with spaces', () => {
            expect(Validator.validateEmail('test @example.com')).to.be.false;
        });
        it('should return false for an email with SQL injection characters', () => {
            expect(Validator.validateEmail('test@example.com; DROP TABLE users;')).to.be.false;
        });
    });

    // Password Validation
    describe('Password Validation', () => {
        it('should return true for a valid password', () => {
            expect(Validator.validatePassword('SecurePass123!')).to.be.true;
        });
        it('should return false for a password shorter than 8 characters', () => {
            expect(Validator.validatePassword('Short1')).to.be.false;
        });
        it('should return false for a password longer than 20 characters', () => {
            expect(Validator.validatePassword('a'.repeat(21))).to.be.false;
        });
        it('should return false for a password without numbers', () => {
            expect(Validator.validatePassword('PasswordOnly')).to.be.false;
        });
        it('should return false for a password with spaces', () => {
            expect(Validator.validatePassword('Pass word123')).to.be.false;
        });
        it('should return false for a password with SQL injection patterns', () => {
            expect(Validator.validatePassword('Passw0rd;--')).to.be.false;
        });
    });

    // Phone Validation
    describe('Phone Validation', () => {
        it('should return true for a valid 10-digit phone number', () => {
            expect(Validator.validatePhone('1234567890')).to.be.true;
        });
        it('should return false for a phone number with letters', () => {
            expect(Validator.validatePhone('123ABC7890')).to.be.false;
        });
        it('should return false for a phone number with special characters', () => {
            expect(Validator.validatePhone('123-456-7890')).to.be.false;
        });
        it('should return false for a phone number shorter than 10 digits', () => {
            expect(Validator.validatePhone('12345')).to.be.false;
        });
        it('should return false for a phone number longer than 10 digits', () => {
            expect(Validator.validatePhone('123456789012')).to.be.false;
        });
    });

    // Price Validation
    describe('Price Validation', () => {
        it('should return true for a valid price', () => {
            expect(Validator.validatePrice(99.99)).to.be.true;
        });
        it('should return false for a negative price', () => {
            expect(Validator.validatePrice(-9.99)).to.be.false;
        });
        it('should return true for a price of 0', () => {
            expect(Validator.validatePrice(0)).to.be.true;
        });
        it('should return false for non-numeric input', () => {
            expect(Validator.validatePrice('fifty')).to.be.false;
        });
    });

    // Rating Validation
    describe('Rating Validation', () => {
        it('should return true for a valid rating of 1', () => {
            expect(Validator.validateRating(1)).to.be.true;
        });
        it('should return true for a valid rating of 5', () => {
            expect(Validator.validateRating(5)).to.be.true;
        });
        it('should return false for a rating less than 1', () => {
            expect(Validator.validateRating(0)).to.be.false;
        });
        it('should return false for a rating greater than 5', () => {
            expect(Validator.validateRating(6)).to.be.false;
        });
        it('should return false for a decimal rating', () => {
            expect(Validator.validateRating(4.5)).to.be.false;
        });
        it('should return false for non-numeric rating', () => {
            expect(Validator.validateRating('excellent')).to.be.false;
        });
    });

    // Date Validation
    describe('Date Validation', () => {
        it('should return true for a valid date', () => {
            expect(Validator.validateDate('2024-11-31')).to.be.true;
        });
        
        it('should return false for an invalid date format', () => {
            expect(Validator.validateDate('31/12/2024')).to.be.false;
        });
       
        it('should return false for non-date strings', () => {
            expect(Validator.validateDate('not-a-date')).to.be.false;
        });
    });

    // Integer Validation
    describe('Integer Validation', () => {
        it('should return true for a valid positive integer', () => {
            expect(Validator.validateInteger(42)).to.be.true;
        });
        it('should return true for zero', () => {
            expect(Validator.validateInteger(0)).to.be.true;
        });
        it('should return false for a negative integer', () => {
            expect(Validator.validateInteger(-5)).to.be.false;
        });
        it('should return false for a decimal number', () => {
            expect(Validator.validateInteger(42.5)).to.be.false;
        });
        it('should return false for non-numeric input', () => {
            expect(Validator.validateInteger('forty-two')).to.be.false;
        });
    });
});
