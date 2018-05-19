export const validationConstants = {
    
    notNull: {
        type: 'notNull',
        defaultMessage: 'This value can\'t be empty.'
    },
    noSpecialCharacters: {
        type: 'noSpecialCharacters',
        defaultMessage: 'This value can\'t contain special characters.'
    },
    notLongerThan: {
        type: 'notLongerThan',
        defaultMessage: 'This value can\'t be longer than {validationLength}.',
        values: {
            validationLength: 0
        }
    },
    notLessThan: {
        type: 'notLessThan',
        defaultMessage: 'This value can\'t be less than {validationLength}.',
        values: {
            validationLength: 0
        }
    },
    isEmail: {
        type: 'isEmail',
        defaultMessage: 'This value isn\'t a valid email.'
    },
    isEqual: {
        type: 'isEqual',
        defaultMessage: 'Values don\'t match.',
        values: {
            firstInput: '',
            secondInput: '',
        }
    },
    contains: {
        type: 'contains',
        defaultMessage: 'This value doesn\'t contain required value.',
        values: {
            validationText: ''
        }
    },
};