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
			.catch(function() {
				// If the promise is rejected, we will return a message saying that the
				// data is unavailable.
				self.setState({
					leaderboard: {
						leaderboardError: 'error'
					}
				});
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
			.catch(function() {
				self.setState({
					leaderboard: {
						leaderboardError: 'error'
					}
				});
			});
		};
	}

	// Load recent leaderboard data after component mounts
	componentDidMount() {
		this.getRecentData();
	}

	render() {
		/*
			If leaderboard is empty, return null
			Otherwise fill the table with the appropriate data from leaderboard.
		*/
		let leaderboardRows;
		if (_.isEmpty(this.state.leaderboard) || _.has(this.state.leaderboard, 'leaderboardError')) {
			leaderboardRows = null;
		} else {
			leaderboardRows = this.state.leaderboard.map( (camperData, index) => {
				return (
					<tr key={camperData.username}>
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
					{
						_.has(this.state.leaderboard, 'leaderboardError') ?
						/* If promise for retrieving data was rejected render this */
						<div style={{textAlign: 'center'}}> Data is not available </div> :
						/* Otherwise render the data */
						<CamperTable
							leaderboardRows={leaderboardRows}
							handleAllTimeClick={this.handleAllTimeClick}
							getRecentData={this.getRecentData}
						/>
					}
					</div>
				</div>
			</div>
		);
	}
};
