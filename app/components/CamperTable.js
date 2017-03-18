const React = require('react');

module.exports = class CamperTable extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				<table>
					<thead>
						<tr>
							<th width='5%'>#</th>
							<th width='35%'>Camper</th>
							<th width='30%'><a href='#' onClick={this.props.getRecentData}>Points in past 30 days</a></th>
							<th width='30%'><a href='#' onClick={this.props.handleAllTimeClick}>All time points</a></th>
						</tr>
					</thead>
					<tbody>
						{this.props.leaderboardRows}
					</tbody>
				</table>
			</div>
		);
	}
};
