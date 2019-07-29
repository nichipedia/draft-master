import React, {Component} from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css"


class PlayerTable extends Component {

	constructor(props) {
		super(props);
		this.state = { picked: {}, drafted: {}};

		this.toggleDrafted = this.toggleDrafted.bind(this);
		this.togglePicked = this.togglePicked.bind(this);
	}

	togglePicked(name) {
		const newSelected = Object.assign({}, this.state.picked);
		newSelected[name] = !this.state.picked[name];
		this.setState({
			picked: newSelected
		});
	}

	toggleDrafted(name) {
		const newSelected = Object.assign({}, this.state.drafted);
		newSelected[name] = !this.state.drafted[name];
		this.setState({
			drafted: newSelected
		});
	}

	rowFn = (state, rowInfo, column, instance) => {
    const { picked } = this.state;
    console.log(rowInfo);
    return {
	      onClick: (e, handleOriginal) => {
	        console.log("It was in this row:", rowInfo);

	        // IMPORTANT! React-Table uses onClick internally to trigger
	        // events like expanding SubComponents and pivots.
	        // By default a custom 'onClick' handler will override this functionality.
	        // If you want to fire the original onClick handler, call the
	        // 'handleOriginal' function.
	        if (handleOriginal) {
	          handleOriginal();
	        }
	      },
	      style: {
	        
	      }
	    };
	  };


	render() {
		let data = [];
		const {players} = this.props;
		players.forEach((player) => {
			data.push({
				name: player.name,
				team: player.team,
				bye: player.bye
			});
		});
		const columns = [
		{
			id: "picker",
			accessor: "",
			Header: "Picked",
			Cell: ({ original }) => {
				return (
					<input
						type="checkbox"
						className="checkbox"
						checked={this.state.picked[original.name] === true}
						onChange={() => this.togglePicked(original.name)}
					/>
				);
			}
		}, {
			id: "drafter",
			accessor: "",
			Header: "Drafted",
			Cell: ({ original }) => {
				return (
					<input
						type="checkbox"
						className="checkbox"
						checked={this.state.drafted[original.name] === true}
						onChange={() => this.toggleDrafted(original.name)}
					/>
				);
			}
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

		return <ReactTable data={data} columns={columns} getTrProps={this.rowFn}/>
	}
}
export default PlayerTable;