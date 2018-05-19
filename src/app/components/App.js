import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {appActions} from '../actions/index';
import  router  from '../router/router';
import { Container } from 'semantic-ui-react';


class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}
	static get propTypes() {
		return {
			state: PropTypes.any,
			dispatch: PropTypes.func
		};
	}
	componentDidMount() {
		this.props.dispatch(appActions.AppSaysHello());
	}
	render() {
		return (
			<Container fluid>
				{router}
				<div style={{height: '600px'}}/>
			</Container>
		);
	}
}
App.displayName = 'App';
App.defaultProps = {};

const mapStateToProps = (state) => {
	return {state};
};

export default connect(mapStateToProps)(App);