import { describe, suite, test } from 'node:test';
import assert from 'node:assert';
import { greetUser, validatePassword } from '../app.js';
import { generateRandomString } from '../utils/stringHelper.js';

// suite is used to club tests belonging to similar functionality
suite('greet functionality', () => {
    test('should greet the user correctly', () => {
        /**
         * Follow AAA thumb rule
         * Arrange
         * Act
         * Assert
         */
        // Arrange
        const name = 'World';
        const expectedOutput = 'Hello World!';

        // Act
        const actualOutput = greetUser(name);

        // Assert
        assert.strictEqual(actualOutput, expectedOutput);
    });

    test('should throw error if no name is provided', () => {
        assert.throws(() => greetUser(), {
            name: 'Error',
            message: 'Provide a valid name',
        });
    });
});

// describe is an alias for suite
describe('user password validation', () => {
    test('should validate password that follows all the requirements', () => { 
        const password = 'rashidCodes007';
        const expectedOutput = {
            isValid: true,
            error: null
        };

        const actualOutput = validatePassword(password);

        assert.deepEqual(actualOutput, expectedOutput);
    });

    test('should invalidate password with length < 8', () => {
        const password = 'rashid';
        const expectedOutput = {
            isValid: false,
            error: 'Password length should be >= 8'
        };

        const actualOutput = validatePassword(password);

        assert.deepEqual(actualOutput, expectedOutput);
    });

    test('should invalidate password with length > 24', () => {
        // Arrange
        const password = generateRandomString(25);
        const expectedOutput = {
            isValid: false,
            error: 'Password length should be <= 24'
        };

        // Act
        const actualOutput = validatePassword(password);

        // Assert
        assert.deepEqual(actualOutput, expectedOutput);
    });

    test('should invalidate password with no lowercase character', () => {
        const password = 'HELLO_WORLD';
        const expectedOutput = {
            isValid: false,
            error: 'Password must contain atleast 1 lowercase letter (a-z)'
        };

        const actualOutput = validatePassword(password);

        assert.deepEqual(actualOutput, expectedOutput);
    });

    test('should invalidate password with white spaces', () => {
        const password = 'Rashid 2026 \t \n';
        const expectedOutput = {
            isValid: false,
            error: 'Password must not contain whitespace characters'
        };

        const actualOutput = validatePassword(password);

        // check that actual output invalidates the password
        assert.deepEqual(actualOutput, expectedOutput);
    });

    test('should invalidate password with >= 4 consecutively same characters', () => { 
        const password = 'aaaa12345A';
        const expectedOutput = {
            isValid: false,
            error: 'Password must not contain any character repeated more than 3 times consecutively.'
        };

        const actualOutput = validatePassword(password);

        // check that actual output invalidates the password
        assert.deepEqual(actualOutput, expectedOutput);
    });


    test('should invalidate password with 4 consecutive ascending chars', () => {
         const password = 'Rashid2026_abcdijiij';
        const expectedOutput = {
            isValid: false,
            error: 'Password must not contain 4 consecutive ascending/descending chars'
        };

        const actualOutput = validatePassword(password);

        // check that actual output invalidates the password
        assert.deepEqual(actualOutput, expectedOutput);
    });

    test('should invalidate password with 4 consecutive descending chars', () => {
        const password = 'Rashid_12hgfe';
        const expectedOutput = {
            isValid: false,
            error: 'Password must not contain 4 consecutive ascending/descending chars'
        };

        const actualOutput = validatePassword(password);

        // check that actual output invalidates the password
        assert.deepEqual(actualOutput, expectedOutput);
    });

    test('should invalidate password with >= 4 consecutive ascending chars with different case', () => {
         const password = 'Rashid_12abCD';
        const expectedOutput = {
            isValid: false,
            error: 'Password must not contain 4 consecutive ascending/descending chars'
        };

        const actualOutput = validatePassword(password);

        // check that actual output invalidates the password
        assert.deepEqual(actualOutput, expectedOutput);
    });

    test('should invalidate password with >= 4 consecutive ascending digits', () => {
        const password = 'Rashid121234jkd';
        const expectedOutput = {
            isValid: false,
            error: 'Password must not contain 4 consecutive ascending/descending chars'
        };

        const actualOutput = validatePassword(password);

        // check that actual output invalidates the password
        assert.deepEqual(actualOutput, expectedOutput);
    });
});

describe('string helper', () => {
    test('should return empty string for length = 0', () => {
        const result = generateRandomString(0);

        assert.strictEqual(result.length, 0);
    })

    test('should return random string of required length', () => { 
        const result = generateRandomString(10);

        assert.strictEqual(result.length, 10);
    });
});