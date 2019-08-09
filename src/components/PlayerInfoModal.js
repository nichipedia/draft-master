import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import {Bar, Line, Doughnut, Radar} from 'react-chartjs-2';
import { fade } from '@material-ui/core/styles/colorManipulator';
const broker = require('adp-scraper');

 

class PlayerInfoModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			info: null,
			logs: null
		};
	}

	getPlayerInfo() {
		if (this.props.playerInfo.name != null) {
			console.log(this.props.playerInfo);
			Promise.all([broker.getPlayerStats(this.props.playerInfo), broker.getPlayerGameLogs(this.props.playerInfo)])
			.then(res => {
				this.setState({info: res[0], logs: res[1]});
				console.log(res[0]);
				console.log(res[1]);
			})
			.catch(err => {
				console.log(err);
			});
		}
	}

	render() {
		const styles = {
		    dialogPaper: {
		        minHeight: '80vh',
		        maxHeight: '80vh',
		    },
		};
		if (this.state.info != null && this.state.info.name == this.props.playerInfo.name) {
			let injury = '';
			let cur = 0;
			if (this.props.playerInfo.pos != 'DEF') {
				if (this.state.info.ir.injury) {
					injury = this.state.info.ir.injury;
				}
				cur = this.state.info.career.length - 1;
			}
			return (
				<div>
					<Dialog open={this.props.open} onClose={this.props.onClose} maxWidth={"md"} fullWidth={true}>
					    <DialogTitle id="alert-dialog-title">{this.state.info.name}</DialogTitle>
					    <Box m={1}>
							<Paper>
						    	<Grid container>
						    		<Grid item md={2}>
						    			<Avatar alt={this.state.info.name} src={this.state.info.picture} style={{margin:10,width:60,height:60}}/>
						    		</Grid>
						    		<Grid item md={10}>
						    			<Paper>
						    				<h1>2018 Summary</h1>
						    				<Table>
						    					<TableHead>
							    					{ (() => {
							    						if (this.props.playerInfo.pos === 'WR' || this.props.playerInfo.pos === 'RB' || this.props.playerInfo.pos == 'TE') {
															return (
																<TableRow>
									    							<TableCell>Yards</TableCell>
									    							<TableCell>Fumbles</TableCell>
									    							<TableCell>TDs</TableCell>
									    							<TableCell>Games Started</TableCell>
									    						</TableRow>
									    					);
							    						} else if (this.props.playerInfo.pos === 'QB') {
							    							return (
							    								<TableRow>
							    									<TableCell>Throwing Yards</TableCell>
									    							<TableCell>Touchdowns</TableCell>
									    							<TableCell>Interceptions</TableCell>
									    							<TableCell>QBR</TableCell>
							    								</TableRow>
							    							)
							    						} else if (this.props.playerInfo.pos === 'PK') {
															return (
							    								<TableRow>
							    									<TableCell>Total Attempts</TableCell>
									    							<TableCell>Total Made</TableCell>	
							    								</TableRow>
							    							)
							    						} else if (this.props.playerInfo.pos === 'DEF') {
															return (
																<TableRow>
							    									<TableCell>Interceptions</TableCell>
									    							<TableCell>Pick Six</TableCell>
									    							<TableCell>Sacks</TableCell>
									    							<TableCell>Forced Fumbles</TableCell>
									    							<TableCell>Safties</TableCell>
							    								</TableRow>
							    							);
							    						}
							    					})()
							    					}
						    					</TableHead>
						    					<TableBody>						    						
						    						{ (() => {
						    							if (this.props.playerInfo.pos === 'WR' || this.props.playerInfo.pos === 'RB' || this.props.playerInfo.pos == 'TE') {
						    								return (
						    									<TableRow>			
								    								<TableCell>{this.state.info.career[cur].summary.scrimmage}</TableCell>
								    								<TableCell>{this.state.info.career[cur].fumbles}</TableCell>
								    								<TableCell>{this.state.info.career[cur].summary.total_touchdowns}</TableCell>
								    								<TableCell>{this.state.info.career[cur].games_started}</TableCell>
																</TableRow>
								    						);
						    							} else if (this.props.playerInfo.pos === 'QB') {
															return (
						    									<TableRow>			
								    								<TableCell>{this.state.info.career[cur].skills[2].yards}</TableCell>
								    								<TableCell>{this.state.info.career[cur].skills[2].touchdowns}</TableCell>
								    								<TableCell>{this.state.info.career[cur].skills[2].interceptions}</TableCell>
								    								<TableCell>{this.state.info.career[cur].skills[2].qbr}</TableCell>
																</TableRow>
								    						);
							    						} else if (this.props.playerInfo.pos === 'PK') {
															return (
						    									<TableRow>			
								    								<TableCell>{this.state.info.career[cur].total.attempts}</TableCell>
								    								<TableCell>{this.state.info.career[cur].total.made}</TableCell>
																</TableRow>
								    						);
							    						} else if (this.props.playerInfo.pos === 'DEF') {
							    							return (
						    									<TableRow>			
								    								<TableCell>{this.state.info.interceptions}</TableCell>
								    								<TableCell>{this.state.info.pick_six}</TableCell>
								    								<TableCell>{this.state.info.sacks}</TableCell>
								    								<TableCell>{this.state.info.forced_fumbles}</TableCell>
								    								<TableCell>{this.state.info.safties}</TableCell>
																</TableRow>
								    						);
							    						}
						    						})()
						    						}
						    					</TableBody>
						    				</Table>
						    			</Paper>
						    		</Grid>
						    	</Grid>
						    	<Grid container>
						    		<Grid item md={12}>
						    				{(() => {
						    					if (injury != '') {
						    						return (
						    							<Paper>
						    								Injury: {injury}
						    							</Paper>
						    						);
						    					} else {
						    						return (
						    							<Paper>
						    								Healthy
						    							</Paper>
						    						);
						    					}
						    				})()
						    				}
						    		</Grid>
						    	</Grid>
						    		{ 	(() => {
						    				if (this.props.playerInfo.pos === 'RB') {
							    				let yearLabels = [];
							    				let yearRushTds = [];
							    				let yearRecievingTds = [];
							    				let yearRushYards = [];
							    				let yearRecievingYards = [];
							    				this.state.info.career.forEach(year => {
							    					yearLabels.push(year.season);
							    					yearRushTds.push(parseFloat(year.skills[0].touchdowns));
							    					yearRecievingTds.push(parseFloat(year.skills[1].touchdowns));
							    					yearRushYards.push(parseFloat(year.skills[0].yards));
							    					yearRecievingYards.push(parseFloat(year.skills[1].yards));
							    				});
							    				let gameLabels = [];
							    				let perGameRushTds = [];
							    				let perGameRecievingTds = [];
							    				let perGameRecievingYards = [];
							    				let perGameRushYards = [];
							    				this.state.logs.games.forEach(game => {
							    					gameLabels.push(game.opp);
							    					perGameRushTds.push(parseFloat(game.stats.rushing.touchdowns));
							    					perGameRecievingTds.push(parseFloat(game.stats.recieving.touchdowns));
							    					perGameRecievingYards.push(parseFloat(game.stats.recieving.yards));
							    					perGameRushYards.push(parseFloat(game.stats.rushing.yards));
							    				});
							    				const yearTdData = {
							    					labels: yearLabels,
							    					datasets: [{
							    						label: 'Rushing Touchdowns',
							    						backgroundColor: 'rgba(255,99,132,0.2)',
												        borderColor: 'rgba(255,99,132,1)',
												        borderWidth: 1,
												        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
												        hoverBorderColor: 'rgba(255,99,132,1)',
							    						data: yearRushTds						 
							    					}, {
							    						label: 'Recieving Touchdowns',
							    						backgroundColor: 'rgba(75,192,192,0.4)',
      													borderColor: 'rgba(75,192,192,1)',
												        borderWidth: 1,
												        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
												        hoverBorderColor: 'rgba(75,192,192,1)',
							    						data: yearRecievingTds						 
							    					}]
							    				};
							    				const yearYardData = {
							    					labels: yearLabels,
							    					datasets: [{
							    						label: 'Rushing Yards',
							    						backgroundColor: 'rgba(255,99,132,0.2)',
												        borderColor: 'rgba(255,99,132,1)',
												        borderWidth: 1,
												        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
												        hoverBorderColor: 'rgba(255,99,132,1)',
							    						data: yearRushYards						 
							    					}, {
							    						label: 'Recieving Yards',
							    						backgroundColor: 'rgba(75,192,192,0.4)',
      													borderColor: 'rgba(75,192,192,1)',
												        borderWidth: 1,
												        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
												        hoverBorderColor: 'rgba(75,192,192,1)',
							    						data: yearRecievingYards						 
							    					}]
							    				};
							    				const gameTdData = {
							    					labels: gameLabels,
							    					datasets: [{
							    						label: 'Rushing Touchdowns',
							    						backgroundColor: 'rgba(255,99,132,0.2)',
												        borderColor: 'rgba(255,99,132,1)',
												        borderWidth: 1,
												        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
												        hoverBorderColor: 'rgba(255,99,132,1)',
							    						data: perGameRushTds						 
							    					}, {
							    						label: 'Recieving Touchdowns',
							    						backgroundColor: 'rgba(75,192,192,0.4)',
      													borderColor: 'rgba(75,192,192,1)',
												        borderWidth: 1,
												        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
												        hoverBorderColor: 'rgba(75,192,192,1)',
							    						data: perGameRecievingTds						 
							    					}]
							    				};
							    				const gameYardData = {
							    					labels: gameLabels,
							    					datasets: [{
							    						label: 'Rushing Yards',
							    						backgroundColor: 'rgba(255,99,132,0.2)',
												        borderColor: 'rgba(255,99,132,1)',
												        borderWidth: 1,
												        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
												        hoverBorderColor: 'rgba(255,99,132,1)',
							    						data: perGameRushYards						 
							    					}, {
							    						label: 'Recieving Yards',
							    						backgroundColor: 'rgba(75,192,192,0.4)',
      													borderColor: 'rgba(75,192,192,1)',
												        borderWidth: 1,
												        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
												        hoverBorderColor: 'rgba(75,192,192,1)',
							    						data: perGameRecievingYards						 
							    					}]
							    				};
							    				return (
							    					<Grid container>
							    						<h4>Career Stats</h4>
								    					<Grid container>
							    							<Grid item sm={6}>
								    							<Bar data={yearTdData}/>
								    						</Grid>
								    						<Grid item sm={6}>
								    							<Bar data={yearYardData}/>
								    						</Grid>
								    					</Grid>
								    					<h4>{this.state.info.career[cur].season} Per Game Stats</h4>
								    					<Grid container>
								    						<Grid item sm={6}>
								    							<Bar data={gameTdData}/>
								    						</Grid>
								    						<Grid item sm={6}>
								    							<Bar data={gameYardData}/>
								    						</Grid>
								    					</Grid>
							    					</Grid>
							    				);
							    			} else if (this.props.playerInfo.pos === 'WR' || this.props.playerInfo.pos === 'TE') {
							    				let yearLabels = [];
							    				let yearRecievingTds = [];
							    				let yearRecievingYards = [];
							    				this.state.info.career.forEach(year => {
							    					yearLabels.push(year.season);							    					
							    					yearRecievingTds.push(parseFloat(year.skills[0].touchdowns));
							    					yearRecievingYards.push(parseFloat(year.skills[0].yards));
							    				});
							    				let gameLabels = [];
							    				let perGameRecievingTds = [];
							    				let perGameRecievingYards = [];
							    				this.state.logs.games.forEach(game => {
							    					gameLabels.push(game.opp);
							    					perGameRecievingTds.push(parseFloat(game.stats.recieving.touchdowns));
							    					perGameRecievingYards.push(parseFloat(game.stats.recieving.yards));
							    				});
							    				const yearTdData = {
							    					labels: yearLabels,
							    					datasets: [{
							    						label: 'Recieving Touchdowns',
							    						fill: false,
												        lineTension: 0.1,
												        backgroundColor: '#90caf9',
												        borderColor: '#42a5f5',
												        borderCapStyle: 'butt',
												        borderDash: [],
												        borderDashOffset: 0.0,
												        borderJoinStyle: 'miter',
												        pointBorderColor: 'rgba(75,192,192,1)',
												        pointBackgroundColor: '#fff',
												        pointBorderWidth: 1,
												        pointHoverRadius: 5,
												        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
												        pointHoverBorderColor: 'rgba(220,220,220,1)',
												        pointHoverBorderWidth: 2,
												        pointRadius: 1,
												        pointHitRadius: 10,
							    						data: yearRecievingTds						 
							    					}]
							    				};
							    				const yearYardData = {
							    					labels: yearLabels,
							    					datasets: [{
							    						label: 'Recieving Yards',
							    						fill: false,
												        lineTension: 0.1,
												        backgroundColor: '#90caf9',
												        borderColor: '#42a5f5',
												        borderCapStyle: 'butt',
												        borderDash: [],
												        borderDashOffset: 0.0,
												        borderJoinStyle: 'miter',
												        pointBorderColor: 'rgba(75,192,192,1)',
												        pointBackgroundColor: '#fff',
												        pointBorderWidth: 1,
												        pointHoverRadius: 5,
												        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
												        pointHoverBorderColor: 'rgba(220,220,220,1)',
												        pointHoverBorderWidth: 2,
												        pointRadius: 1,
												        pointHitRadius: 10,
							    						data: yearRecievingYards						 
							    					}]
							    				};
							    				const gameTdData = {
							    					labels: gameLabels,
							    					datasets: [{
							    						label: 'Recieving Touchdowns',
							    						fill: false,
												        lineTension: 0.1,
												        backgroundColor: '#2196f3',
												        borderColor: '#1976d2',
												        borderCapStyle: 'butt',
												        borderDash: [],
												        borderDashOffset: 0.0,
												        borderJoinStyle: 'miter',
												        pointBorderColor: 'rgba(75,192,192,1)',
												        pointBackgroundColor: '#fff',
												        pointBorderWidth: 1,
												        pointHoverRadius: 5,
												        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
												        pointHoverBorderColor: 'rgba(220,220,220,1)',
												        pointHoverBorderWidth: 2,
												        pointRadius: 1,
												        pointHitRadius: 10,
							    						data: perGameRecievingTds						 
							    					}]
							    				};
							    				const gameYardData = {
							    					labels: gameLabels,
							    					datasets: [{
							    						label: 'Recieving Yards',
							    						fill: false,
												        lineTension: 0.1,
												        backgroundColor: '#2196f3',
												        borderColor: '#1976d2',
												        borderCapStyle: 'butt',
												        borderDash: [],
												        borderDashOffset: 0.0,
												        borderJoinStyle: 'miter',
												        pointBorderColor: 'rgba(75,192,192,1)',
												        pointBackgroundColor: '#fff',
												        pointBorderWidth: 1,
												        pointHoverRadius: 5,
												        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
												        pointHoverBorderColor: 'rgba(220,220,220,1)',
												        pointHoverBorderWidth: 2,
												        pointRadius: 1,
												        pointHitRadius: 10,
							    						data: perGameRecievingYards						 
							    					}]
							    				};
							    				return (
							    					<Grid container>
							    						<h4>Career Stats</h4>
								    					<Grid container>
							    							<Grid item sm={6}>
								    							<Line data={yearTdData}/>
								    						</Grid>
								    						<Grid item sm={6}>
								    							<Line data={yearYardData}/>
								    						</Grid>
								    					</Grid>
								    					<h4>{this.state.info.career[cur].season} Per Game Stats</h4>
								    					<Grid container>
															<Grid item sm={6}>
								    							<Line data={gameTdData}/>
								    						</Grid>
								    						<Grid item sm={6}>
								    							<Line data={gameYardData}/>
								    						</Grid>
								    					</Grid>
								    				</Grid>
							    				);
							    			} else if (this.props.playerInfo.pos === 'QB') {
												let yearLabels = [];
							    				let yearPassingTds = [];
							    				let yearPassingYards = [];
							    				this.state.info.career.forEach(year => {
							    					yearLabels.push(year.season);							    					
							    					yearPassingTds.push(parseFloat(year.skills[2].touchdowns));
							    					yearPassingYards.push(parseFloat(year.skills[2].yards));
							    				});
							    				let gameLabels = [];
							    				let perGamePassTds = [];
							    				let perGameRushTds = [];
							    				let perGamePassYards = [];
							    				let perGameRushYards = [];
							    				let perGamePicks = [];
							    				let perGameQBR = [];
							    				let perGameSacked = [];
							    				this.state.logs.games.forEach(game => {
							    					gameLabels.push(game.opp);
							    					perGameRushTds.push(parseFloat(game.stats.rushing.touchdowns));
							    					perGamePassTds.push(parseFloat(game.stats.passing.touchdowns));
							    					perGamePassYards.push(parseFloat(game.stats.passing.yards));
							    					perGameRushYards.push(parseFloat(Math.abs(game.stats.rushing.yards)));
							    					perGamePicks.push(parseFloat(game.stats.passing.interceptions));
							    					perGameQBR.push(parseFloat(game.stats.passing.qbr));
							    					perGameSacked.push(parseFloat(game.stats.passing.sacked));
							    				});
							    				const yearTdData = {
							    					labels: yearLabels,
							    					datasets: [{
							    						label: 'Passing Touchdowns',
							    						fill: false,
												        lineTension: 0.1,
												        backgroundColor: '#00796b',
												        borderColor: '#00695c',
												        borderCapStyle: 'butt',
												        borderDash: [],
												        borderDashOffset: 0.0,
												        borderJoinStyle: 'miter',
												        pointBorderColor: 'rgba(75,192,192,1)',
												        pointBackgroundColor: '#fff',
												        pointBorderWidth: 1,
												        pointHoverRadius: 5,
												        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
												        pointHoverBorderColor: 'rgba(220,220,220,1)',
												        pointHoverBorderWidth: 2,
												        pointRadius: 1,
												        pointHitRadius: 10,
							    						data: yearPassingTds						 
							    					}]
							    				};
							    				const yearYardData = {
							    					labels: yearLabels,
							    					datasets: [{
							    						label: 'Passing Yards',
							    						fill: false,
												        lineTension: 0.1,
												        backgroundColor: '#00796b',
												        borderColor: '#00695c',
												        borderCapStyle: 'butt',
												        borderDash: [],
												        borderDashOffset: 0.0,
												        borderJoinStyle: 'miter',
												        pointBorderColor: 'rgba(75,192,192,1)',
												        pointBackgroundColor: '#fff',
												        pointBorderWidth: 1,
												        pointHoverRadius: 5,
												        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
												        pointHoverBorderColor: 'rgba(220,220,220,1)',
												        pointHoverBorderWidth: 2,
												        pointRadius: 1,
												        pointHitRadius: 10,
							    						data: yearPassingYards					 
							    					}]
							    				}
							    				const gameQBRData = {
							    					labels: gameLabels,
							    					datasets: [{
							    						label: 'QBR',
							    						fill: false,
												        lineTension: 0.1,
												        backgroundColor: fade('#00bfa5', 0.4),
												        borderColor: '#00bfa5',
												        borderCapStyle: 'butt',
												        borderDash: [],
												        borderDashOffset: 0.0,
												        borderJoinStyle: 'miter',
												        pointBorderColor: 'rgba(75,192,192,1)',
												        pointBackgroundColor: '#fff',
												        pointBorderWidth: 1,
												        pointHoverRadius: 5,
												        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
												        pointHoverBorderColor: 'rgba(220,220,220,1)',
												        pointHoverBorderWidth: 2,
												        pointRadius: 1,
												        pointHitRadius: 10,
							    						data: perGameQBR					 
							    					}]
							    				}
							    				const gamePickSackData = {
							    					labels: gameLabels,
							    					datasets: [{
							    						label: 'Times Sacked',
							    						backgroundColor: fade('#ffeb3b', 0.4),
												        borderColor: '#ffeb3b',
												        borderWidth: 1,
												        backgroundColor: fade('#fbc02d', 0.4),
      													borderColor: '#fbc02d',
							    						data: perGameSacked						 
							    					}, {
							    						label: 'Times Picked',
							    						backgroundColor: fade('#00695c', 0.4),
      													borderColor: '#00695c',
												        borderWidth: 1,
												        hoverBackgroundColor: fade('#004d40', 0.4),
												        hoverBorderColor: '#004d40',
							    						data: perGamePicks						 
							    					}]
							    				};
							    				const gameTdData = {
							    					labels: gameLabels,
							    					datasets: [{
							    						label: 'Rushing Touchdowns',
							    						backgroundColor: 'rgba(255,99,132,0.2)',
												        borderColor: 'rgba(255,99,132,1)',
												        borderWidth: 1,
												        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
												        hoverBorderColor: 'rgba(255,99,132,1)',
							    						data: perGameRushTds
							    					}, {
							    						label: 'Passing Touchdowns',
							    						backgroundColor: fade('#80cbc4', 0.4),
      													borderColor: '#80cbc4',
												        borderWidth: 1,
												        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
												        hoverBorderColor: 'rgba(75,192,192,1)',
							    						data: perGamePassTds		 
							    					}]
							    				};
							    				const gameYardData = {
							    					labels: gameLabels,
							    					datasets: [{
							    						label: 'Rushing Yards',
							    						backgroundColor: 'rgba(255,99,132,0.2)',
												        borderColor: 'rgba(255,99,132,1)',
												        borderWidth: 1,
												        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
												        hoverBorderColor: 'rgba(255,99,132,1)',
							    						data: perGameRushYards						 
							    					}, {
							    						label: 'Passing Yards',
							    						backgroundColor: fade('#80cbc4', 0.4),
      													borderColor: '#80cbc4',
												        borderWidth: 1,
												        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
												        hoverBorderColor: 'rgba(75,192,192,1)',
							    						data: perGamePassYards						 
							    					}]
							    				};
							    				return (
							    					<Grid container>
							    						<h4>Career Stats</h4>
								    					<Grid container>
							    							<Grid item sm={6}>
								    							<Line data={yearTdData}/>
								    						</Grid>
								    						<Grid item sm={6}>
								    							<Line data={yearYardData}/>
								    						</Grid>
								    					</Grid>
								    					<h4>{this.state.info.career[cur].season} Per Game Stats</h4>
								    					<Grid container>
															<Grid item sm={6}>
								    							<Bar data={gameTdData}/>
								    						</Grid>
								    						<Grid item sm={6}>
								    							<Bar data={gameYardData}/>
								    						</Grid>
								    					</Grid>
								    					<Grid container>
															<Grid item sm={6}>
								    							<Bar data={gamePickSackData}/>
								    						</Grid>
								    						<Grid item sm={6}>
								    							<Line data={gameQBRData}/>
								    						</Grid>
								    					</Grid>
								    				</Grid>
							    				);
							    			} else if (this.props.playerInfo.pos === 'PK') {					    					
							    				let extra = [];
							    				let chips = [];
							    				let twenties = [];
							    				let thirties = [];
							    				let fourties = [];
							    				let fifties = [];

							    				let extraAttempted = parseFloat(this.state.info.career[cur]['extra_points'].attempts);
							    				let extraMade = parseFloat(this.state.info.career[cur]['extra_points'].made);
							    				let chipsAttempted = parseFloat(this.state.info.career[cur]['0-19'].attempts);
							    				let chipsMade = parseFloat(this.state.info.career[cur]['0-19'].made); 
							    				let twentiesAttempted = parseFloat(this.state.info.career[cur]['20-29'].attempts);
							    				let twentiesMade = parseFloat(this.state.info.career[cur]['20-29'].made); 
							    				let thirtiesAttempted = parseFloat(this.state.info.career[cur]['30-39'].attempts);
							    				let thirtiesMade = parseFloat(this.state.info.career[cur]['30-39'].made);
							    				let fourtiesAttempted = parseFloat(this.state.info.career[cur]['40-49'].attempts);
							    				let fourtiesMade = parseFloat(this.state.info.career[cur]['40-49'].made); 
							    				let fiftiesAttempted = parseFloat(this.state.info.career[cur]['50+'].attempts);
							    				let fiftiesMade = parseFloat(this.state.info.career[cur]['50+'].made);

						    					extra.push(extraAttempted - extraMade);
						    					extra.push(extraMade);
						    					chips.push(chipsAttempted - chipsMade);
						    					chips.push(chipsMade);
						    					twenties.push(twentiesAttempted - twentiesMade);
						    					twenties.push(twentiesMade);
						    					thirties.push(thirtiesAttempted - thirtiesMade);
						    					thirties.push(thirtiesMade);
						    					fourties.push(fourtiesAttempted - fourtiesMade);
						    					fourties.push(fourtiesMade);
						    					fifties.push(fiftiesAttempted - fiftiesMade);
						    					fifties.push(fiftiesMade);
							    				const extraData = {
													labels: ['Extra Points Missed', 'Extra Points Made'],
													datasets: [{
														data: extra,
														backgroundColor: [
														'#424242',
														'#ff9100',
														],
														hoverBackgroundColor: [
														'#212121',
														'#ff6d00',
														]
													}]
												};	
												const chipData = {
													labels: ['0-19 Missed', '0-19 Made'],
													datasets: [{
														data: chips,
														backgroundColor: [
														'#424242',
														'#f57c00',
														],
														hoverBackgroundColor: [
														'#212121',
														'#ef6c00',
														]
													}]
												};	
												const twentiesData = {
													labels: ['20-29 Missed', '20-29 Made'],
													datasets: [{
														data: twenties,
														backgroundColor: [
														'#424242',
														'#f57c00',
														],
														hoverBackgroundColor: [
														'#212121',
														'#ef6c00',
														]
													}]
												};	
												const thirtiesData = {
													labels: ['30-39 Missed', '30-39 Made'],
													datasets: [{
														data: thirties,
														backgroundColor: [
														'#424242',
														'#f57c00',
														],
														hoverBackgroundColor: [
														'#212121',
														'#ef6c00',
														]
													}]
												};	
												const fourtiesData = {
													labels: ['40-49 Missed', '40-49 Made'],
													datasets: [{
														data: fourties,
														backgroundColor: [
														'#424242',
														'#f57c00',
														],
														hoverBackgroundColor: [
														'#212121',
														'#ef6c00',
														]
													}]
												};	
												const fiftiesData = {
													labels: ['50+ Missed', '50+ Made'],
													datasets: [{
														data: fifties,
														backgroundColor: [
														'#424242',
														'#f57c00',
														],
														hoverBackgroundColor: [
														'#212121',
														'#ef6c00',
														]
													}]
												};	
												return (
													<Grid container>
								    					<Grid container>
							    							<Grid item sm={6}>
								    							<Doughnut data={extraData}/>
								    						</Grid>
								    						<Grid item sm={6}>
								    							<Doughnut data={chipData}/>
								    						</Grid>
								    					</Grid>
								    					<Grid container>
							    							<Grid item sm={6}>
								    							<Doughnut data={twentiesData}/>
								    						</Grid>
								    						<Grid item sm={6}>
								    							<Doughnut data={thirtiesData}/>
								    						</Grid>
								    					</Grid>
								    					<Grid container>
							    							<Grid item sm={6}>
								    							<Doughnut data={fourtiesData}/>
								    						</Grid>
								    						<Grid item sm={6}>
								    							<Doughnut data={fiftiesData}/>
								    						</Grid>
								    					</Grid>
								    				</Grid>
							    				);
							    			} else if (this.props.playerInfo.pos === 'DEF') {
							    				let gameLabels = [];
							    				let pointsAllowed = [];
							    				let sacks = [];
							    				let picks = [];
							    				this.state.logs.games.forEach(game => {
							    					gameLabels.push(game.opp);
							    					pointsAllowed.push(parseFloat(game.points_allowed));
							    					sacks.push(parseFloat(game.sacks));
							    					picks.push(parseFloat(game.interceptions));
							    				});
							    				const pickedSackedData = {
							    					labels: gameLabels,
							    					datasets: [{
							    						label: 'Interceptions',
							    						backgroundColor: fade('#5c6bc0', 0.4),
												        borderColor: '#5c6bc0',
												        borderWidth: 1,
												        hoverBackgroundColor: fade('#3f51b5', 0.4),
												        hoverBorderColor: '#3f51b5',
							    						data: picks						 
							    					}, {
							    						label: 'Sacks',
							    						backgroundColor: fade('#4527a0', 0.4),
      													borderColor: '#4527a0',
												        borderWidth: 1,
												        hoverBackgroundColor: fade('#311b92', 0.4),
												        hoverBorderColor: '#311b92',
							    						data: sacks						 
							    					}]
							    				};
							    				// const pointsAllowedData = {
							    				// 	labels: gameLabels,
							    				// 	datasets: [{
							    				// 		label: 'Points Allowed',
							    				// 		fill: false,
												   //      lineTension: 0.1,
												   //      backgroundColor: 'rgba(75,192,192,0.4)',
												   //      borderColor: 'rgba(75,192,192,1)',
												   //      borderCapStyle: 'butt',
												   //      borderDash: [],
												   //      borderDashOffset: 0.0,
												   //      borderJoinStyle: 'miter',
												   //      pointBorderColor: 'rgba(75,192,192,1)',
												   //      pointBackgroundColor: '#fff',
												   //      pointBorderWidth: 1,
												   //      pointHoverRadius: 5,
												   //      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
												   //      pointHoverBorderColor: 'rgba(220,220,220,1)',
												   //      pointHoverBorderWidth: 2,
												   //      pointRadius: 1,
												   //      pointHitRadius: 10,
							    				// 		data: pointsAllowed					 
							    				// 	}]
							    				// };

							    				const pointsAllowedData = {
							    					labels: gameLabels,
							    					datasets: [  {
												    	label: 'Points Allowed',
												      	backgroundColor: fade('#512da8', 0.4),
      													borderColor: '#512da8',
												      	pointBackgroundColor: 'rgba(179,181,198,1)',
												      	pointBorderColor: '#fff',
												      	pointHoverBackgroundColor: '#fff',
												      	pointHoverBorderColor: 'rgba(179,181,198,1)',
												      	data: pointsAllowed
												    }]
							    				}


							    				return (
							    					<Grid container>							    					
								    					<h4>2018 Per Game Stats</h4>
								    					<Grid container>
															<Grid item sm={6}>
								    							<Bar data={pickedSackedData}/>
								    						</Grid>
								    						<Grid item sm={6}>
								    							<Radar data={pointsAllowedData}/>
								    						</Grid>
								    					</Grid>
								    				</Grid>
							    				);
							    			}
						    			})()
						    		}
							</Paper>
						</Box>
					</Dialog>
				</div>
			);
		} else {
			if (this.props.playerInfo.name != null) {
				this.getPlayerInfo();
			}
			return (
				<div>
					<Dialog open={this.props.open} onClose={this.props.onClose}>
					    <DialogTitle id="alert-dialog-title">Player Info!</DialogTitle>
					    <DialogContent>
						    	<CircularProgress />
						</DialogContent>
					</Dialog>
				</div>
			);
		}
	}


}
export default PlayerInfoModal;