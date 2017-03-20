const React = require('react');
import axios from 'axios';
const _ = require('lodash/core');
const LeaderboardHeading = require('../components/LeaderboardHeading');
const CamperTable = require('../components/CamperTable');
const profilePicStyles = require('../styles/styles.js').profilePicStyles;

module.exports = class CamperLeaderboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			leaderboard: {}
		};
		let self = this;

		// Get camper recent leaderboard data
		self.getRecentData = () => {
			axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
			.then(function(result) {
				self.setState({
					leaderboard: result.data
				});
			})
			.catch(function(error) {
				console.log('This is my catch error: ' + error);
			});
		};
		// Get new data for when user clicks 'All time points'
		self.handleAllTimeClick = () => {
			axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
			.then(function(result) {
				self.setState({
					leaderboard: result.data
				});
			})
			.catch(function(error) {
				console.log('This is my catch error: ' + error);
			});
		};
	}

	// Load recent leaderboard data after component mounts
	componentDidMount() {
		this.getRecentData();
	}

	render() {
		/*
			If leaderboard is empty, return null so camperTable renders without data.
			Otherwise fill the table with the appropriate data from leaderboard.
		*/
		let leaderboardRows;
		if (_.isEmpty(this.state.leaderboard)) {
			leaderboardRows = null;
		} else {
			leaderboardRows = this.state.leaderboard.map( (camperData, index) => {
				return (
					<tr key={index}>
						<td>{index + 1}</td>
						<td>
							<a href={'https://www.freecodecamp.com/' + camperData.username}>
							<img src={camperData.img}
							alt={camperData.username + 'profile picture'}
							style={profilePicStyles}
							/>
							{camperData.username}
							</a>
							</td>
						<td>{camperData.recent}</td>
						<td>{camperData.alltime}</td>
					</tr>
				);
			});
		}

		return (
			<div className='container'>
				<div className='row'>
					<div className='small-12 columns'>
						<LeaderboardHeading />
					</div>
				</div>
				<div className='row'>
					<div className='small-12 columns'>
						<CamperTable
							leaderboardRows={leaderboardRows}
							handleAllTimeClick={this.handleAllTimeClick}
							getRecentData={this.getRecentData}
						/>
					</div>
				</div>
			</div>
		);
	}
};
