import React, {Component} from 'react';
import PlayerTable from './PlayerTable';

const broker = require('adp-scraper');

class DraftBoard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			players: {},
			drafted: [],
			picked: [],
		};
	}

	componentWillMount() {
		broker.getADP()
		
		.then(res => {
			this.setState({
				players: {
					RB: res.RB,
					QB: res.QB,
					TE: res.TE,
					PK: res.TK,
					WR: res.WR,
					DEF: res.DEF
				}
			});
			console.log(res.RB);
		})
		.catch(err => {
			console.log(err);
			return;
		});
	}

	render() {
		return(
			<div>
				<PlayerTable players={this.state.players.RB}/>
			</div>
		);
	}
}
export default DraftBoard;