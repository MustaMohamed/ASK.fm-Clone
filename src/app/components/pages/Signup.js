import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Container, Menu, Button, Header,
    Divider, Icon, Grid, Input, Dropdown
} from 'semantic-ui-react';



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
            userEmail: {},
            userFullName: {},
            userName: {},
            userPassword: {},
            userData: {}
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
    }

    _submit() {

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
                                    <Input name={'userPassword'} onChange={this._handleInputChange} fluid placeholder='Password' type='password' />
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

