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
						    						<TableRow>
						    							<TableCell>Yards</TableCell>
						    							<TableCell>Fumbles</TableCell>
						    							<TableCell>TDs</TableCell>
						    							<TableCell>Games Started</TableCell>
						    						</TableRow>
						    					</TableHead>
						    					<TableBody>
						    						<TableRow>
						    							<TableCell>{this.state.info.career[cur].summary.scrimmage}</TableCell>
						    							<TableCell>{this.state.info.career[cur].fumbles}</TableCell>
						    							<TableCell>{this.state.info.career[cur].summary.total_touchdowns}</TableCell>
						    							<TableCell>{this.state.info.career[cur].games_started}</TableCell>
						    						</TableRow>
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