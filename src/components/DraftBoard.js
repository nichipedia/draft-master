import React, {Component} from 'react';
import PlayerTable from './PlayerTable';
import LinearProgress from '@material-ui/core/LinearProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import DraftedPlayers from './DraftedPlayers';
import PlayerInfoModal from './PlayerInfoModal';

const broker = require('adp-scraper');

class DraftBoard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			players: {
				RB: [],
				QB: [],
				TE: [],
				PK: [],
				WR: [],
				DEF: []
			},
			drafted: {},
			draftedPlayers: [],
			picked: {},
			playerInfo: {
				open: false,
				name: null,
				team: null
			}
		};

		broker.getADP()
		.then(res => {
			let adpPlayers = {
				RB: res.RB,
				QB: res.QB,
				TE: res.TE,
				PK: res.PK,
				WR: res.WR,
				DEF: res.DEF
			};
			this.setState({players: adpPlayers});
		})
		.catch(err => {
			console.log(err);
			return;
		});
		this.draftPlayer = this.draftPlayer.bind(this);
		this.pickPlayer = this.pickPlayer.bind(this);
		this.displayPlayerInfo = this.displayPlayerInfo.bind(this);
		this.closePlayerInfo = this.closePlayerInfo.bind(this);
	}

	displayPlayerInfo(name, team) {
		this.setState({playerInfo: {open: true, name: name, team: team}});
	}

	closePlayerInfo() {
		this.setState({playerInfo: {open: false, name: null, team: null}});
	}

	draftPlayer(name, pos, team, bye) {
		if (!this.state.picked[name]) {
			const newSelected = Object.assign({}, this.state.drafted);
			const draftedClone = [...this.state.draftedPlayers];
			newSelected[name] = !this.state.drafted[name];
			if (newSelected[name]) {
				draftedClone.push({
					name: name,
					pos: pos,
					team: team,
					bye: bye
				});
			} else {
				for (let i = 0; i < draftedClone.length; i++) {
					if (draftedClone[i].name === name) {
						draftedClone.splice(i, 1);
					}
				}
			}
			this.setState({
				drafted: newSelected,
				draftedPlayers: draftedClone
			});
			console.log(this.state.draftedPlayers);
		}
	}

	pickPlayer(name) {
		const newSelected = Object.assign({}, this.state.picked);
		if (!this.state.drafted[name]) {
			newSelected[name] = !this.state.picked[name];
			this.setState({
				picked: newSelected
			});
		}
	}

	render() {
		if (this.state.players.RB.length != 0) {
			return(
				<div>
					<Box m={1}>
						<PlayerInfoModal open={this.state.playerInfo.open} playerInfo={this.state.playerInfo} onClose={this.closePlayerInfo}/>
						<Grid container>
						   	<Grid item md={10}>
						   		<Grid container>
						   			<Grid item md={4}>
						   				<Paper>
						   					<Paper style={{backgroundColor: '#f44336'}}>Running Backs</Paper>
											<PlayerTable players={this.state.players.RB} 
											togglePick={this.pickPlayer} 
											toggleDraft={this.draftPlayer}
											picked={this.state.picked}
											drafted={this.state.drafted}
											pos={"RB"}
											displayInfo={this.displayPlayerInfo}/>
										</Paper>
									</Grid>
									<Grid item md={4}>
										<Paper>
											<Paper style={{backgroundColor: '#2196f3'}}>Wide Recievers</Paper>
											<PlayerTable players={this.state.players.WR} 
											togglePick={this.pickPlayer} 
											toggleDraft={this.draftPlayer}
											picked={this.state.picked}
											drafted={this.state.drafted}
											pos={"WR"}
											displayInfo={this.displayPlayerInfo}/>
										</Paper>
									</Grid>
									<Grid item md={4}>
										<Paper>
											<Paper style={{backgroundColor: '#009688'}}>Quater Backs</Paper>
											<PlayerTable players={this.state.players.QB} 
											togglePick={this.pickPlayer} 
											toggleDraft={this.draftPlayer}
											picked={this.state.picked}
											drafted={this.state.drafted}
											pos={"QB"}
											displayInfo={this.displayPlayerInfo}/>
										</Paper>
									</Grid>
								</Grid>
								<Grid container>
									<Grid item md={4}>
										<Paper>
											<Paper style={{backgroundColor: '#8bc34a'}}>Tight Ends</Paper>
											<PlayerTable players={this.state.players.TE} 
											togglePick={this.pickPlayer} 
											toggleDraft={this.draftPlayer}
											picked={this.state.picked}
											drafted={this.state.drafted}
											pos={"TE"}
											displayInfo={this.displayPlayerInfo}/>
										</Paper>
									</Grid>
									<Grid item md={4}>
										<Paper>
											<Paper style={{backgroundColor: '#ff9800'}}>Kickers</Paper>
											<PlayerTable players={this.state.players.PK} 
											togglePick={this.pickPlayer} 
											toggleDraft={this.draftPlayer}
											picked={this.state.picked}
											drafted={this.state.drafted}
											pos={"PK"}
											displayInfo={this.displayPlayerInfo}/>
										</Paper>
									</Grid>
									<Grid item md={4}>
										<Paper>
											<Paper style={{backgroundColor: '#795548'}}>Defense</Paper>
											<PlayerTable players={this.state.players.DEF} 
											togglePick={this.pickPlayer} 
											toggleDraft={this.draftPlayer}
											picked={this.state.picked}
											drafted={this.state.drafted}
											pos={"DEF"}
											displayInfo={this.displayPlayerInfo}/>
										</Paper>
									</Grid>
								</Grid>	
							</Grid>
							<Grid item md={2}>
								<Paper>My Team</Paper>
								<DraftedPlayers draftedPlayers={this.state.draftedPlayers}/>
							</Grid>
						</Grid>
					</Box>
				</div>
			);
		} else {
			return(
     	    	<LinearProgress />
			);
		}
	}
}
export default DraftBoard;