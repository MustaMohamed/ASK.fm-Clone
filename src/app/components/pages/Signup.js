import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Container, Menu, Button, Header,
    Divider, Icon, Grid, Dropdown, Label,
} from 'semantic-ui-react';
import { validationConstants } from '../../constants/index';
import { userActions } from '../../actions/index';
import { validationServices } from '../../services/index';
import TextBox from '../generic/TextBox';

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
            userBirthday: {
                day: 0,
                month: 0,
                year: 0
            },
            error: false
        };
        this._submit = this._submit.bind(this);
        this._handleInputChange = this._handleInputChange.bind(this);
        this._handleDateChange = this._handleDateChange.bind(this);
    }
    static get propTypes() {
        return {
            dispatch: PropTypes.func,
            user: PropTypes.object,
            history: PropTypes.object
        };
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if(newProps.user.key) {
            this.props.history.push('/');
        }
    }

    _handleInputChange(inputName, inputValue) {
        this.setState(Object.assign(this.state, {
            [inputName]: inputValue
        }));
    }

    _handleDateChange(e, data) {
        this.setState(Object.assign(this.state, {
            userBirthday: Object.assign({}, {
                ...this.state.userBirthday,
                [data.placeholder]: data.value
            })
        }));
    }

    _submit() {
        if (!this._registerValid()) {
            const { userEmail, userFullName, userName, userPassword, userBirthday } = this.state;
            this.setState({ error: false });
            let userData = {
                fullName: userFullName.value,
                userName: userName.value,
                email: userEmail.value,
                password: userPassword.value,
                birthday: userBirthday.day + '/' + userBirthday.month + '/' + userBirthday.year
            };
            const { dispatch } = this.props;
            dispatch(userActions.Register(userData));
        } else {
            this.setState({ error: true });
        }
    }

    _registerValid() {
        // values to validate
        const keys = ['userPassword', 'userFullName', 'userName', 'userEmail'];

        // prev state
        let config = this.state;
        // console.log(config);
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
        if (!(this.state.userBirthday.day && this.state.userBirthday.month && this.state.userBirthday.year))
            errorMessages.push(1);
        this.setState(config);
        return errorMessages.length;
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
                        <Grid centered>
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
                                    <TextBox
                                        inputError={this.state.error}
                                        inputName={'userEmail'}
                                        onInputValueChange={this._handleInputChange}
                                        inputValue={this.state.userEmail}
                                        fluid placeholder='Email' />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <TextBox
                                        inputError={this.state.error}
                                        inputName={'userFullName'}
                                        inputValue={this.state.userFullName}
                                        onInputValueChange={this._handleInputChange}
                                        fluid placeholder='Full Name' />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <TextBox
                                        inputValue={this.state.userName}
                                        inputName={'userName'}
                                        inputError={this.state.error}
                                        onInputValueChange={this._handleInputChange}
                                        fluid placeholder='User Name' />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column>
                                    <TextBox
                                        fluid placeholder={'Password'}
                                        inputError={this.state.error}
                                        inputName={'userPassword'}
                                        inputType={'password'}
                                        inputValue={this.state.userPassword}
                                        onInputValueChange={this._handleInputChange} />
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                    <Header size={'small'} inverted>Birthday</Header>
                            </Grid.Row>
                            <Grid.Row columns={4}>
                                <Grid.Column width={5}>
                                    <Dropdown
                                        error={this.state.error && this.state.userBirthday.day === 0}
                                        // value={this.state.userBirthday.day}
                                        fluid search placeholder='day'
                                        onChange={this._handleDateChange}
                                        selection options={days} />
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    <Dropdown
                                        error={this.state.error && this.state.userBirthday.month === 0}
                                        // value={this.state.userBirthday.month}
                                        fluid search placeholder='month'
                                        onChange={this._handleDateChange}
                                        selection options={months} />
                                </Grid.Column>
                                <Grid.Column width={6}>
                                    <Dropdown
                                        error={this.state.error && this.state.userBirthday.year === 0}
                                        // value={this.state.userBirthday.year}
                                        fluid search placeholder='year'
                                        onChange={this._handleDateChange}
                                        selection options={years} />
                                </Grid.Column>
                                 
                                <Grid.Column width={16} textAlign={'center'}>
                                    {
                                        this.state.error && (!this.state.userBirthday.day || !this.state.userBirthday.month || !this.state.userBirthday.year) ?
                                            <Label basic color='red' position={'bellow'} pointing>Please Enter a valid Birthday !</Label> : null
                                    }
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

