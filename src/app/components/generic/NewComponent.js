import React from 'react';
// import PropTypes from 'prop-types';

// CSS stye
// import style from '../../css/style.css';

class NewComponet extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    static get propTypes() {
        return {
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
            <div>
            </div>
        );
    }
}
NewComponet.displayName = 'NewComponet';
NewComponet.defaultProps = {};

// using redux
// const mapStateToProps = (state) => {
//     return { state };
// };
// export default connect(mapStateToProps)(NewComponet);

export default NewComponet;