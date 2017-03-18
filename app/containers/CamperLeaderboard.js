const React = require('react');
import axios from 'axios';
const _ = require('lodash/core');
const LeaderboardHeading = require('../components/LeaderboardHeading');
const CamperTable = require('../components/CamperTable');

module.exports = class CamperLeaderboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			recentLeaderboard: {}
		};
		let self = this;

		// Get camper leaderboard data
		axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
		.then(function(result) {
			self.setState({
				recentLeaderboard: result.data
			});
			console.log(result); // Using console due to winston not working with webpack
			console.log(typeof(result));
		})
		.catch(function(error) {
			console.log('This is my catch error: ' + error);
		});
	}

	render() {
		/*
			If recentLeaderboard is empty, return null so camperTable renders without data.
			Otherwise fill the table with the appropriate data from recentLeaderboard.
		*/
		let leaderboardRows;
		if (_.isEmpty(this.state.recentLeaderboard)) {
			leaderboardRows = null;
		} else {
			leaderboardRows = this.state.recentLeaderboard.map( (camperData, index) => {
				return (
					<tr key={index}>
						<td>{index + 1}</td>
						<td>{camperData.username}</td>
						<td>{camperData.recent}</td>
						<td>{camperData.alltime}</td>
					</tr>
				);
			});
		}


		return (
			<div className='container'>
				<div className='row'>
					<LeaderboardHeading />
				</div>
				<div className='row'>
					<CamperTable leaderboardRows={leaderboardRows}/>
				</div>
			</div>
		);
	}
};
