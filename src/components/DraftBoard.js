import React, {Component} from 'react';
import PlayerTable from './PlayerTable';

const broker = require('adp-scraper');

class DraftBoard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			players: null,
			drafted: [],
			picked: []
		};
		broker.getADP()
		.then(res => {
			let adpPlayers = {
				RB: res.RB,
				QB: res.QB,
				TE: res.TE,
				PK: res.TK,
				WR: res.WR,
				DEF: res.DEF
			};
			this.state.players = {adpPlayers};
			console.log(this.state.players);
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