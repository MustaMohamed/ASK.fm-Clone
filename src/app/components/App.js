import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {appActions} from '../actions/app.action';
import  router  from '../router/router';
// CSS stye
// import style from '../css/style.css';

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
		this.props.dispatch(appActions.AppSaysHello());
	}
	render() {
		return (
			<div>
				{router}
			</div>
		);
	}
}
App.displayName = 'App';
App.defaultProps = {};

const mapStateToProps = (state) => {
	return {state};
};

export default connect(mapStateToProps)(App);