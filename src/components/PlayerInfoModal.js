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
import {Bar, Line, Doughnut} from 'react-chartjs-2';
const broker = require('adp-scraper');

 

class PlayerInfoModal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			info: null
		};
	}

	getPlayerInfo() {
		if (this.props.playerInfo.name != null) {
			console.log(this.props.playerInfo);
			broker.getPlayerStats(this.props.playerInfo)
			.then(res => {
				this.setState({info: res});
				console.log(res);
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
							    				let labels = [];
							    				let rushTds = [];
							    				let recievingTds = [];
							    				let rushYards = [];
							    				let recievingYards = [];
							    				this.state.info.career.forEach(year => {
							    					labels.push(year.season);
							    					rushTds.push(parseFloat(year.skills[0].touchdowns));
							    					recievingTds.push(parseFloat(year.skills[1].touchdowns));
							    					rushYards.push(parseFloat(year.skills[0].yards));
							    					recievingYards.push(parseFloat(year.skills[1].yards));
							    				});
							    				const tdData = {
							    					labels: labels,
							    					datasets: [{
							    						label: 'Rushing Touchdowns',
							    						backgroundColor: 'rgba(255,99,132,0.2)',
												        borderColor: 'rgba(255,99,132,1)',
												        borderWidth: 1,
												        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
												        hoverBorderColor: 'rgba(255,99,132,1)',
							    						data: rushTds						 
							    					}, {
							    						label: 'Recieving Touchdowns',
							    						backgroundColor: 'rgba(75,192,192,0.4)',
      													borderColor: 'rgba(75,192,192,1)',
												        borderWidth: 1,
												        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
												        hoverBorderColor: 'rgba(75,192,192,1)',
							    						data: recievingTds						 
							    					}]
							    				};
							    				const yardData = {
							    					labels: labels,
							    					datasets: [{
							    						label: 'Rushing Yards',
							    						backgroundColor: 'rgba(255,99,132,0.2)',
												        borderColor: 'rgba(255,99,132,1)',
												        borderWidth: 1,
												        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
												        hoverBorderColor: 'rgba(255,99,132,1)',
							    						data: rushYards						 
							    					}, {
							    						label: 'Recieving Yards',
							    						backgroundColor: 'rgba(75,192,192,0.4)',
      													borderColor: 'rgba(75,192,192,1)',
												        borderWidth: 1,
												        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
												        hoverBorderColor: 'rgba(75,192,192,1)',
							    						data: recievingYards						 
							    					}]
							    				};
							    				return (
							    					<Grid container>
						    							<Grid item sm={6}>
							    							<Bar data={tdData}/>
							    						</Grid>
							    						<Grid item sm={6}>
							    							<Bar data={yardData}/>
							    						</Grid>
							    					</Grid>
							    				);
							    			} else if (this.props.playerInfo.pos === 'WR' || this.props.playerInfo.pos === 'TE') {
							    				let labels = [];
							    				let recievingTds = [];
							    				let recievingYards = [];
							    				this.state.info.career.forEach(year => {
							    					labels.push(year.season);							    					
							    					recievingTds.push(parseFloat(year.skills[0].touchdowns));
							    					recievingYards.push(parseFloat(year.skills[0].yards));
							    				});
							    				const tdData = {
							    					labels: labels,
							    					datasets: [{
							    						label: 'Recieving Touchdowns',
							    						fill: false,
												        lineTension: 0.1,
												        backgroundColor: 'rgba(75,192,192,0.4)',
												        borderColor: 'rgba(75,192,192,1)',
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
							    						data: recievingTds						 
							    					}]
							    				};
							    				const yardData = {
							    					labels: labels,
							    					datasets: [{
							    						label: 'Recieving Yards',
							    						fill: false,
												        lineTension: 0.1,
												        backgroundColor: 'rgba(75,192,192,0.4)',
												        borderColor: 'rgba(75,192,192,1)',
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
							    						data: recievingYards						 
							    					}]
							    				};
							    				return (
							    					<Grid container>
						    							<Grid item sm={6}>
							    							<Line data={tdData}/>
							    						</Grid>
							    						<Grid item sm={6}>
							    							<Line data={yardData}/>
							    						</Grid>
							    					</Grid>
							    				);
							    			} else if (this.props.playerInfo.pos === 'QB') {
												let labels = [];
							    				let recievingTds = [];
							    				let yards = [];
							    				this.state.info.career.forEach(year => {
							    					labels.push(year.season);							    					
							    					recievingTds.push(parseFloat(year.skills[2].touchdowns));
							    					yards.push(parseFloat(year.skills[2].yards));
							    				});
							    				const tdData = {
							    					labels: labels,
							    					datasets: [{
							    						label: 'Thrown Touchdowns',
							    						fill: false,
												        lineTension: 0.1,
												        backgroundColor: 'rgba(75,192,192,0.4)',
												        borderColor: 'rgba(75,192,192,1)',
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
							    						data: recievingTds						 
							    					}]
							    				};
							    				const yardData = {
							    					labels: labels,
							    					datasets: [{
							    						label: 'Throwing Yards',
							    						fill: false,
												        lineTension: 0.1,
												        backgroundColor: 'rgba(75,192,192,0.4)',
												        borderColor: 'rgba(75,192,192,1)',
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
							    						data: yards					 
							    					}]
							    				}
							    				return (
							    					<Grid container>
						    							<Grid item sm={6}>
							    							<Line data={tdData}/>
							    						</Grid>
							    						<Grid item sm={6}>
							    							<Line data={yardData}/>
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
														'gray',
														'#36A2EB',
														],
														hoverBackgroundColor: [
														'gray',
														'#36A2EB',
														]
													}]
												};	
												const chipData = {
													labels: ['0-19 Missed', '0-19 Made'],
													datasets: [{
														data: chips,
														backgroundColor: [
														'gray',
														'#36A2EB',
														],
														hoverBackgroundColor: [
														'gray',
														'#36A2EB',
														]
													}]
												};	
												const twentiesData = {
													labels: ['20-29 Missed', '20-29 Made'],
													datasets: [{
														data: twenties,
														backgroundColor: [
														'gray',
														'blue'
														],
														hoverBackgroundColor: [
														'gray',
														'blue'
														]
													}]
												};	
												const thirtiesData = {
													labels: ['30-39 Missed', '30-39 Made'],
													datasets: [{
														data: thirties,
														backgroundColor: [
														'gray',
														'#36A2EB',
														],
														hoverBackgroundColor: [
														'gray',
														'#36A2EB',
														]
													}]
												};	
												const fourtiesData = {
													labels: ['40-49 Missed', '40-49 Made'],
													datasets: [{
														data: fourties,
														backgroundColor: [
														'gray',
														'#36A2EB',
														],
														hoverBackgroundColor: [
														'gray',
														'#36A2EB',
														]
													}]
												};	
												const fiftiesData = {
													labels: ['50+ Missed', '50+ Made'],
													datasets: [{
														data: fifties,
														backgroundColor: [
														'gray',
														'#36A2EB',
														],
														hoverBackgroundColor: [
														'gray',
														'#36A2EB',
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