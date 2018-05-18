import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

// CSS stye
import style from '../../css/style.css';

class NotFound extends React.Component {

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
                <h1>404 Page not found <Link to={'/router.basename'}>Back to home</Link></h1>
            </div>
        );
    }
}
NotFound.displayName = 'NotFound';
NotFound.defaultProps = {};

export default NotFound;