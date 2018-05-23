import React from 'react';
import PropTypes from 'prop-types';
import { Input, Label } from 'semantic-ui-react';
import { validationServices } from '../../services/index';

// CSS stye
// import style from '../../css/style.css';

class TextBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showError: false
        };
        this._onInputValueChange = this._onInputValueChange.bind(this);
        this.renderPopup = this.renderPopup.bind(this);
        this.componentFocused = this.componentFocused.bind(this);
        this.componentBlurred = this.componentBlurred.bind(this);
    }
    static get propTypes() {
        return {
            popupStyle: PropTypes.object,
            popupClassName: PropTypes.string,
            popupInverted: PropTypes.bool,
            popupContent: PropTypes.object,
            popupHeader: PropTypes.string,
            popupFireOn: PropTypes.string,
            popupIsOpen: PropTypes.bool,
            popupPosition: PropTypes.string,
            popupBasic: PropTypes.bool,
            popupHideOnScroll: PropTypes.func,
            popupOnClose: PropTypes.func,
            popupOnOpen: PropTypes.func,
            popupSize: PropTypes.string,
            inputStyle: PropTypes.object,
            inputClassName: PropTypes.string,
            inputName: PropTypes.string,
            inputValue: PropTypes.object,
            onInputValueChange: PropTypes.func,
            inputError: PropTypes.bool,
            inputType: PropTypes.string,
            placeholder: PropTypes.string,
            fluid: PropTypes.bool,
            inputSize: PropTypes.string
        };
    }
	/*
		// first render
		constructor()
		static getDerivedStateFromProps()
		componentWillMount() / UNSAFE_componentWillMount()
		render()
		componentDidMount()
	*/
	/**
	*	component Update
	*  componentWillReceiveProps() / UNSAFE_componentWillReceiveProps()
		static getDerivedStateFromProps()
		shouldComponentUpdate()
		componentWillUpdate() / UNSAFE_componentWillUpdate()
		render()
		getSnapshotBeforeUpdate()
		componentDidUpdate()
	 */
    componentDidMount() {
    }

    runComponentValidations(rules, value) {
        let error = {};
        if (rules && rules.length)
            error = validationServices.validateInputValueWithRules(rules, value);
        return error;
    }

    _onInputValueChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        const { inputValue, onInputValueChange } = this.props;
        if (inputValue) {
            let error = this.runComponentValidations(inputValue.validationRules, value);
            if (!error.valid) {
                this.setState({ showError: true });
            }
            else if (error.valid)
                this.setState({ showError: false });
            if (onInputValueChange) {
                let tempInputValue = Object.assign({}, inputValue, {
                    value, ...error
                });
                onInputValueChange(name, tempInputValue, this.props);
            }
        }
    }

    componentFocused() {
        if (this.checkIfComponentHasError()) {
            this.setState({ showError: true });
        }
    }
    componentBlurred() {
        this.setState({ showError: false });
    }

    checkIfComponentHasError() {
        return this.props.inputValue && this.props.inputValue.valid === false;
    }

    renderPopup() {
        const { inputValue } = this.props;
        return (
            <Label basic color='red' pointing='below'>{inputValue && !inputValue.valid ? inputValue.currentErrorMessage : ''}</Label>
        );
    }

    render() {
        const { inputStyle, inputClassName, inputName, inputError, inputType,
            placeholder, fluid, inputSize } = this.props;
        const { showError } = this.state;
        return (
            <div>
                {inputError && this.checkIfComponentHasError() && showError && this.renderPopup()}
                <Input
                    style={inputStyle}
                    className={inputClassName}
                    error={inputError && this.checkIfComponentHasError()} // define local error
                    name={inputName}
                    onChange={this._onInputValueChange}
                    fluid={fluid}
                    placeholder={placeholder}
                    onBlur={this.componentBlurred}
                    onFocus={this.componentFocused}
                    type={inputType}
                    size={inputSize} />
            </div>
        );
    }
}

TextBox.displayName = 'TextBox';
TextBox.defaultProps = {};

export default TextBox;