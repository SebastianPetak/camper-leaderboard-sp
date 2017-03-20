const React = require('react');

module.exports = class LeaderboardHeading extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<h1 style={{textAlign: 'center', margin: '1em'}}>FreeCodeCamp Leaderboard <i className='fa fa-free-code-camp' ariaHidden='true'></i></h1>
			</div>
		);
	}
};
// <i className={fa fa-free-code-camp} ariaHidden={true}></i>
