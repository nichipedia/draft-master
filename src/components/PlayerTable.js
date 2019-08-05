import React, {Component} from 'react';
import ReactTable from 'react-table';
import Checkbox from '@material-ui/core/Checkbox';
import "react-table/react-table.css";

class PlayerTable extends Component {

	constructor(props) {
		super(props);
		this.toggleDrafted = this.toggleDrafted.bind(this);
		this.togglePicked = this.togglePicked.bind(this);
	}

	togglePicked(name) {
		if (!this.props.drafted[name]) {
			this.props.togglePick(name);
		}
	}

	toggleDrafted(name, pos, team, bye) {
		if (!this.props.picked[name]) {
			this.props.toggleDraft(name, pos, team, bye);
		}
	}

	tdFn = (state, rowInfo, column, instance) => {
		return {
	      onClick: (e, handleOriginal) => {
	        // IMPORTANT! React-Table uses onClick internally to trigger
	        // events like expanding SubComponents and pivots.
	        // By default a custom 'onClick' handler will override this functionality.
	        // If you want to fire the original onClick handler, call the
	        // 'handleOriginal' function.
	        if (column.Header === 'Name') {
	        	this.props.displayInfo(rowInfo.original.name, rowInfo.original.team, this.props.pos);
	        }
	        if (handleOriginal) {
	          handleOriginal()
	        }
	      }
		}
	}


	rowFn = (state, rowInfo, column, instance) => {
	    if (rowInfo && this.props.drafted[rowInfo.original.name]) {
		    return {
			    onClick: (e, handleOriginal) => {
			        // IMPORTANT! React-Table uses onClick internally to trigger
			        // events like expanding SubComponents and pivots.
			        // By default a custom 'onClick' handler will override this functionality.
			        // If you want to fire the original onClick handler, call the
			        // 'handleOriginal' function.
			        //this.props.displayInfo(rowInfo.original.name, rowInfo.original.team);
				    if (handleOriginal) {
			    	    handleOriginal();
			      	}
			    },
			    style: {
			    	background: 'lightgreen'
			    }
			};	
	    } else if (rowInfo && this.props.picked[rowInfo.original.name]) {
	    	return {
			    onClick: (e, handleOriginal) => {
			        // IMPORTANT! React-Table uses onClick internally to trigger
			        // events like expanding SubComponents and pivots.
			        // By default a custom 'onClick' handler will override this functionality.
			        // If you want to fire the original onClick handler, call the
			        // 'handleOriginal' function.
			        //this.props.displayInfo(rowInfo.original.name, rowInfo.original.team);
				    if (handleOriginal) {
			    	    handleOriginal();
			      	}
			    },
			    style: {
			    	background: 'red'
			    }
			};
	    } else {
	    	return {
			    onClick: (e, handleOriginal) => {
			        // IMPORTANT! React-Table uses onClick internally to trigger
			        // events like expanding SubComponents and pivots.
			        // By default a custom 'onClick' handler will override this functionality.
			        // If you want to fire the original onClick handler, call the
			        // 'handleOriginal' function.
			        //this.props.displayInfo(rowInfo.original.name, rowInfo.original.team);
				    if (handleOriginal) {
			    	    handleOriginal();
			      	}
			    },
			    style: {
			    	background: 'white'
			    }
			};
	    }
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
					<Checkbox
						checked={this.props.picked[original.name] === true}
						onChange={() => this.togglePicked(original.name)}
						color="default"
					/>
				);
			}
		}, {
			id: "drafter",
			accessor: "",
			Header: "Drafted",
			Cell: ({ original }) => {
				return (
					<Checkbox
						checked={this.props.drafted[original.name] === true}
						onChange={() => this.toggleDrafted(original.name, this.props.pos, original.team, original.bye)}
						color="default"
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

		return <ReactTable data={data} columns={columns} getTrProps={this.rowFn} getTdProps={this.tdFn}/>
	}
}
export default PlayerTable;