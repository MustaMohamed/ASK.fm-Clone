import { validationConstants } from '../utils/constants/index';


export const validationServices = {

    // validate input with rules - return from first invalid
    validateInputValueWithRules: (validationRulesList, value) => {
        let validateResult = { valid: true };
        if (validationRulesList && validationRulesList.length) {
            for (let i = 0; i < validationRulesList.length; i++) {
                const rule = validationRulesList[i];
                validateResult = validationServices.getValidationRuleResult(value, rule);
                if (!validateResult.valid)
                    return validateResult;
            }
        } return validateResult;
    },

    //  validate input with rules - returns all invalid messages
    validateAgainstAllRules: (validationRulesList, value) => {
        let validateResult = [];
        for (let i = 0; i < validationRulesList.length; i++) {
            const rule = validationRulesList[i];
            let ruleResult = validationServices.getValidationRuleResult(value, rule);
            if (!ruleResult.valid)
                validateResult.push(ruleResult);
        }
        return validateResult;
    },
    getValidationRuleResult: (value, validateRule) => {
        let validateResult = null;
        switch (validateRule.type) {
            case validationConstants.notNull.type:
                validateResult = validationServices.notNull(value, validateRule);
                break;
            case validationConstants.noSpecialCharacters.type:
                validateResult = validationServices.noSpecialCharacters(value, validateRule);
                break;
            case validationConstants.notLongerThan.type:
                validateResult = validationServices.notLongerThan(value, validateRule.values.validationLength, validateRule);
                break;
            case validationConstants.notLessThan.type:
                validateResult = validationServices.notLessThan(value, validateRule.values.validationLength, validateRule);
                break;
            case validationConstants.contains.type:
                validateResult = validationServices.contains(value, validateRule.values.validationText, validateRule);
                break;
            case validationConstants.isEmail.type:
                validateResult = validationServices.isEmail(value, validateRule);
                break;
            case validationConstants.isEqual.type:
                validateResult = validationServices.isEqual(value, validateRule, (validateRule.values && validateRule.values.secondInput) && validateRule.values.secondInput.value);
                break;
        }
        return validateResult;
    },

     // define small function that run the rules

    notNull: (value, rule) => {
        let valid = (!!value);
        return createErrorObject(valid, rule ? rule : validationConstants.notNull);
    },
    noSpecialCharacters: (value, rule) => {
        let valid = value === undefined || value === '' || /^[0-9a-zA-Z\_]+$/g.test(value);
        return createErrorObject(valid, rule ? rule : validationConstants.noSpecialCharacters);
    },
    notLongerThan: (value, length, rule) => {
        let valid = value === undefined || value === '' || value.length <= length;
        return createErrorObject(valid, rule ? rule : validationConstants.notLongerThan);
    },
    notLessThan: (value, length, rule) => {
        let valid = value === undefined || value === '' || value.length >= length;
        return createErrorObject(valid, rule ? rule : validationConstants.notLessThan);
    },
    contains: (value, validationText, rule) => {
        let valid = value === undefined || value === '' || value.includes(validationText);
        return createErrorObject(valid, rule ? rule : validationConstants.notLongerThan);
    },
    isEmail: (value, validationText, rule) => {
        let valid = value === undefined || value === '' || !!value.match(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g);
        return createErrorObject(valid, rule ? rule : validationConstants.isEmail);
    },
    isEqual: (value, rule, secondInputValue) => {
        let valid = value === secondInputValue;
        return createErrorObject(valid, rule ? rule : validationConstants.isEqual);
    },
};


function createErrorObject(valid, validationConstant) {
    if (valid)
        return { valid };
    else {
        
        let valLength = validationConstant.values ? validationConstant.values.validationLength + '' : '';
        return {
            valid,
            currentErrorMessage: !validationConstant.values ? validationConstant.defaultMessage 
                : validationConstant.defaultMessage + ' ' + valLength
        };
    }
}