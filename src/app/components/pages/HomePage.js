import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// CSS stye
import style from '../../css/style.css';

class HomePage extends React.Component {

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
    }
    render() {
        return (
            <div className={style.container}>
                <h1>Hello the app template, Using <strong style={{ color: '#2980b9' }}>Router is on</strong> for building the project</h1>
            </div>
        );
    }
}
HomePage.displayName = 'HomePage';
HomePage.defaultProps = {};

const mapStateToProps = (state) => {
    return { state };
};

export default connect(mapStateToProps)(HomePage);