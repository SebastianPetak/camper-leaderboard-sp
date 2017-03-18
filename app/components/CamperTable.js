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
							<th width='30%'>Points in past 30 days</th>
							<th width='30%'>All time points</th>
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
