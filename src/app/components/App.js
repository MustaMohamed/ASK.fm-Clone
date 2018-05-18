import React from 'react';
import style from '../css/style.css';

class App extends React.Component {
	render() {
		return (
			<div className={style.container}>
				<h1>Hello the app template, Using <strong style={{ color: '#2980b9'}}>Rollup</strong> for building the project</h1>
			</div>
		);
	}
}
export default App;