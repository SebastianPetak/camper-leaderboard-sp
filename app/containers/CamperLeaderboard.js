const React = require('react');
import axios from 'axios';
const CamperTable = require('../components/CamperTable');

module.exports = class CamperLeaderboard extends React.Component {
	constructor(props) {
		super(props);
		this.State = {
			recentLeaderboard: {}
		};
		let self = this;

		axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
		.then(function(result) {
			self.setState({
				recentLeaderboard: result
			});
			console.log(result); // Using console due to winston not working with webpack
			console.log(typeof(result));
		})
		.catch(function(error) {
			console.log('This is my catch error: ' + error);
		});
	}

	render() {
		return (
			<div>
				<CamperTable />
			</div>
		);
	}
};
