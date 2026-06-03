/**
 * @param {string} name - The user's name.
 * @returns {string} A greeting message.
 * @throws {Error} If no name is provided.
 */
export function greetUser(name) {
    if (!name) {
        // return 'Provide a valid name';
        throw new Error('Provide a valid name');
    }
    return `Hello ${name}!`;
}

// console.log(greetUser('Rashid'));

/**
 * Validates a password against the application's security requirements.
 *
 * Validation rules:
 * - Length must be between 8 and 24 characters.
 * - Must contain at least one lowercase letter (`a-z`).
 * - Must contain at least one uppercase letter (`A-Z`).
 * - Must contain at least one digit (`0-9`).
 * - Must not contain whitespace characters (spaces, tabs, or newlines).
 * - Must not contain any character repeated more than 3 times consecutively.
 * - Must not contain a sequence of 4 or more consecutive ascending characters.
 *
 * @param {string} password - The password to validate.
 * @returns {{ isValid: boolean, error: string | null }}
 * An object containing:
 * - `isValid`: Indicates whether the password passed all validation checks.
 * - `error`: The validation error message, or `null` if the password is valid.
 */
export function validatePassword(password) {
    const length = password.length;
    if (length < 8) {
        return {
            isValid: false,
            error: 'Password length should be >= 8'
        };
    }
    if (length > 24) {
        return {
            isValid: false,
            error: 'Password length should be <= 24'
        };
    }
    let hasLowercase = false, hasUppercase = false, hasDigit = false, hasWhiteSpace = false;
    for (let i = 0; i < length; i++) {
        const char = password[i];
        if (char >= 'a' && char <= 'z') {
            hasLowercase = true;
        }
        else if (char >= 'A' && char <= 'Z') {
            hasUppercase = true;
        }
        else if (char >= '0' && char <= '9') {
            hasDigit = true;
        }
        else if (char === ' ' || char === '\n' || char === '\t') {
            hasWhiteSpace = true;
        }
    }
    if (!hasLowercase) {
        return {
            isValid: false,
            error: 'Password must contain atleast 1 lowercase letter (a-z)'
        };
    }
    if (!hasUppercase) {
        return {
            isValid: false,
            error: 'Password must contain atleast 1 uppercase letter (A-Z)'
        };
    }
    if (!hasDigit) {
        return {
            isValid: false,
            error: 'Password must contain atleast 1 digit (0-9)'
        };
    }
    if (hasWhiteSpace) {
        return {
            isValid: false,
            error: 'Password must not contain whitespace characters'
        };
    }

    // check if the password contains the same character consecutively > 3 times
    for (let i = 0; i <= length - 4; i++) {
        const currentChar = password[i];
        let hasConsecutiveChars = true;
        for (let j = 0; j < 4; j++) {
            if(password[j] != currentChar){
                hasConsecutiveChars = false;
                break;
            }
        }
        if(hasConsecutiveChars){
            return {
                isValid: false,
                error: 'Password must not contain any character repeated more than 3 times consecutively.'
            }
        }
    }

    // check if the password contains >=4 ascending / descending characters
    // check every 4 len subarray
    const normalizedPassword = password.toLowerCase();
    for (let i = 0; i <= length - 4; i++) {
        const differences = [];
        for (let j = 1; j < 4; j++) {
            differences.push(normalizedPassword.charCodeAt(i + j) - normalizedPassword.charCodeAt(i + j - 1));
        }
        // check if all equal and equal to 1 or -1
        if (differences.every(diff => Math.abs(diff) === 1) ) {
            return {
                isValid: false,
                error: 'Password must not contain 4 consecutive ascending/descending chars'
            };
        }
    }

    return {
        isValid: true,
        error: null
    };
}