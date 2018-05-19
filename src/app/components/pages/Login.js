import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Container, Form } from 'semantic-ui-react';

// CSS stye
// import style from '../../css/style.css';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
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
    render() {
        return (
            <div>
                <h1>Hello from login</h1>
            </div>
        );
    }
}
Login.displayName = 'Login';
Login.defaultProps = {};

// using redux
const mapStateToProps = (state) => {
    const { user } = state;
    return { user };
};
export default connect(mapStateToProps)(Login);

// export default Login;