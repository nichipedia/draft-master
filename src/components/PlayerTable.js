import React, {Component} from 'react';
import ReactTable from 'react-table';


class PlayerTable extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let data = [];
		const {players} = this.props;
		players.forEach((player) => {
			data.push({
				picked: () => (
					<input
            		name="picked_player"
            		type="checkbox"
            		 />
				),
				drafted: () => (
					   <input
            			name="isGoing"
            			type="checkbox"
            		    />
				),
				name: player.name,
				team: player.team,
				bye: player.bye
			});
		});
		const columns = [{
			Header: 'Picked',
			accessor: 'picked'
		}, {
			Header: 'Drafted',
			accessor: 'drafted'
		}, {
			Header: 'Name',
			accessor: 'name'
		}, {
			Header: 'Team',
			accessor: 'team'
		}, {
			Header: 'Bye',
			accessor: 'bye'
		}];
		return <ReactTable data={data} columns={columns}/>
	}
}
export default PlayerTable;