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
import {Bar, Line} from 'react-chartjs-2';
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
			if (this.state.info.ir.injury) {
				injury = this.state.info.ir.injury;
			}
			let cur = this.state.info.career.length - 1;
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
						    			<Paper>
						    				Injury: {injury}
						    			</Paper>
						    		</Grid>
						    	</Grid>
						    	<Grid container>
						    		<Grid item sm={6}>
						    		{ 	(() => {
						    				if (this.props.playerInfo.pos === 'RB') {
							    				let labels = [];
							    				let rushTds = [];
							    				let recievingTds = [];
							    				this.state.info.career.forEach(year => {
							    					labels.push(year.season);
							    					rushTds.push(parseFloat(year.skills[0].touchdowns));
							    					recievingTds.push(parseFloat(year.skills[1].touchdowns));
							    				});
							    				const data = {
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
							    				return (<Bar data={data}/>);
							    			} else if (this.props.playerInfo.pos === 'WR' || this.props.playerInfo.pos === 'TE') {
							    				let labels = [];
							    				let recievingTds = [];
							    				this.state.info.career.forEach(year => {
							    					labels.push(year.season);							    					
							    					recievingTds.push(parseFloat(year.skills[0].touchdowns));
							    				});
							    				const data = {
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
							    				return (<Line data={data}/>);
							    			}
						    			})()
						    		}
						    		</Grid>
						    	</Grid>
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