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
							<th>#</th>
							<th>Camper</th>
							<th>Points in past 30 days</th>
							<th>All time points</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
			</div>
		);
	}
};
