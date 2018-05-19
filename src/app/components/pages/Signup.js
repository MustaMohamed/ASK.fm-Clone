import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Container, Menu, Button, Header,
    Divider, Icon, Grid, Input, Dropdown,
    Popup
} from 'semantic-ui-react';
import { validationConstants } from '../../utils/constants/index';
import { userActions } from '../../actions/index';
import { validationServices } from '../../services/index';

// CSS stye
// import style from '../../css/style.css';
// date=icker style
import 'react-datepicker/dist/react-datepicker.css';

class Signup extends React.Component {

    constructor(props) {
        super(props);
        let days = [], months = [], years = [];
        for (let i = 1; i < 32; i++) days.push({ text: i, value: i });
        for (let i = 1; i < 13; i++) months.push({ text: i, value: i });
        for (let i = 1975; i < 2014; i++) years.push({ text: i, value: i });
        this.state = {
            days,
            months,
            years,
            userEmail: {
                validationRules: [
                    { ...validationConstants.notNull },
                    { ...validationConstants.isEmail }
                ]
            },
            userFullName: {
                validationRules: [
                    { ...validationConstants.notNull },
                    { ...validationConstants.noSpecialCharacters },
                    { ...validationConstants.notLongerThan, values: { validationLength: 20 } }
                ]
            },
            userName: {
                validationRules: [
                    { ...validationConstants.notNull },
                    { ...validationConstants.noSpecialCharacters },
                ]
            },
            userPassword: {
                validationRules: [
                    { ...validationConstants.notNull },
                    { ...validationConstants.notLongerThan, values: { validationLength: 20 } },
                    { ...validationConstants.notLessThan, values: { validationLength: 6 } }
                ]
            },
            userBirthday: {},
            error: false
        };
        this._submit = this._submit.bind(this);
        this._handleInputChange = this._handleInputChange.bind(this);
    }
    static get propTypes() {
        return {
            dispatch: PropTypes.func,
            user: PropTypes.object
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

    UNSAFE_componentWillReceiveProps() {
    }
    componentDidMount() {
    }

    _handleInputChange(e, data) {
        // console.log(data);
        let inputName = data.name, inputValue = data.value;
        this.setState(Object.assign(this.state, {
            [inputName]: Object.assign(this.state[inputName], {
                ...this.state[inputName],
                value: inputValue
            })
        }));
    }

    _submit() {
        if (this._registerValid()) {
            const { userEmail, userFullName, userName, userPassword, userBirthday } = this.state;
            let userData = {
                fullName: userFullName.value,
                userName: userName.value,
                email: userEmail.value,
                password: userPassword.value,
                birthday: userBirthday,
            };
            const { dispatch } = this.props;
            dispatch(userActions.Register(userData));
        } else {
            this.setState({ error: true });
            console.log(!!this.state.userPassword.currentErrorMessage);
        }
    }

    _registerValid() {
        // values to validate
        const keys = ['userPassword', 'userFullName', 'userName', 'userEmail', 'userBirthday'];

        // prev state
        let config = this.state;

        // errors in inputs
        let errorMessages = [];
        for (let index = 0; index < keys.length; index++) {
            // get the input name
            let key = keys[index];
            // get the input value
            let field = config[key];

            if (field) {
                // if the value is array
                if (field.length) {

                    field.forEach((childValue, index) => {
                        let validation = childValue.valid === false ? { valid: childValue.valid, currentErrorMessage: childValue.currentErrorMessage } : validationServices.validateInputValueWithRules(childValue.validationRules, childValue.value);
                        if (!validation.valid) {
                            config[key][index] = { ...field[index], ...validation };
                            errorMessages.push({ ...validation });
                        }
                    });
                } else {
                    // let validation = field.valid === false ? {valid:field.valid,currentErrorMessage:field.currentErrorMessage}:validationService.validateAgainstRules(field.validationRules,field.value);
                    let validation = validationServices.validateInputValueWithRules(field.validationRules, field.value);
                    if (!validation.valid) {
                        config[key] = { ...field, ...validation };
                        errorMessages.push({ ...validation });
                    }
                }
            }
        }
        this.setState(config);

        console.log(config);
        return false;
    }
    render() {
        const { days, months, years } = this.state;
        return (
            <Container>
                <Menu inverted secondary>
                    <Container>
                        <Menu.Item header><Header color={'red'} size={'huge'}>ASK.me</Header></Menu.Item>
                        <Menu.Item position={'right'}><Header textAlign={'center'} inverted>Signup</Header></Menu.Item>
                        <Menu.Item position={'right'}>
                            <Button inverted color={'red'}>Login</Button>
                        </Menu.Item>
                    </Container>
                </Menu>
                <Grid stackable centered>
                    <Grid.Column width={8}>
                        <Grid stackable container centered>
                            <Grid.Row>
                                <Divider inverted horizontal>Signup with</Divider>
                            </Grid.Row>
                            <Grid.Row centered columns={4}>
                                <Grid.Column width={3}><Icon link circular size={'big'} inverted name='facebook f' /></Grid.Column>
                                <Grid.Column width={3}><Icon link circular size={'big'} inverted name='twitter' /></Grid.Column>
                                <Grid.Column width={3}><Icon link circular size={'big'} inverted name='instagram' /></Grid.Column>
                                <Grid.Column width={3}><Icon link circular size={'big'} inverted name='vk' /></Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Divider inverted horizontal>or</Divider>
                            </Grid.Row>
                            <Grid.Row centered columns={1}>
                                <Grid.Column>
                                    <Input name={'userEmail'} onChange={this._handleInputChange} fluid placeholder='Email' />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Input name={'userFullName'} onChange={this._handleInputChange} fluid placeholder='Full Name' />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Input name={'userName'} onChange={this._handleInputChange} fluid placeholder='User Name' />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Popup
                                        style={{ backgroundColor: 'red', opacity: '0.8' }}
                                        inverted
                                        trigger={
                                            <Input
                                                error={!!this.state.userPassword.currentErrorMessage}
                                                name={'userPassword'}
                                                onChange={this._handleInputChange}
                                                fluid placeholder='Password'
                                                type='password' />
                                        }
                                        content={this.state.userPassword.currentErrorMessage}
                                        header={'Error Message !'}
                                        on={'focus'}
                                        open={!!this.state.userPassword.currentErrorMessage}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row textAlign={'left'}><Header size={'small'} inverted>Birthday</Header></Grid.Row>
                            <Grid.Row columns={3}>
                                <Grid.Column width={5}>
                                    <Dropdown fluid search placeholder='Day' selection options={days} />
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <Dropdown fluid search placeholder='Month' selection options={months} />
                                </Grid.Column>
                                <Grid.Column width={6}>
                                    <Dropdown fluid search placeholder='year' selection options={years} />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <Button onClick={this._submit} fluid color={'red'}>Signup</Button>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                    </Grid.Column>
                </Grid>
            </Container>
        );
    }
}
Signup.displayName = 'Signup';
Signup.defaultProps = {};

// using redux
const mapStateToProps = (state) => {
    const { user } = state;
    return { user };
};
export default connect(mapStateToProps)(Signup);

