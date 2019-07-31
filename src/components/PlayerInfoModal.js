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
			console.log(this.props.playerInfo.name);
			broker.getPlayerStats(this.props.playerInfo)
			.then(res => {
				this.setState({info: res});
				console.log('got data');
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
			console.log('load modal');
			return (
				<div>
					<Dialog open={this.props.open} onClose={this.props.onClose} maxWidth={"md"} fullWidth={true}>
					    <DialogTitle id="alert-dialog-title">{this.state.info.name}</DialogTitle>
							<Paper>
						    	<Grid container>
						    		<Grid item md={2}>
						    			<Avatar alt={this.state.info.name} src={this.state.info.picture} />
						    		</Grid>
						    		<Grid item md={10}>
						    			Stats!
						    		</Grid>
						    	</Grid>
							</Paper>
					</Dialog>
				</div>
			);
		} else {
			if (this.props.playerInfo.name != null) {
				this.getPlayerInfo();
				console.log('mer');
			}
			return (
				<div>
					<Dialog open={this.props.open} onClose={this.handleClose}>
					    <DialogTitle id="alert-dialog-title">Player Info!</DialogTitle>
					    <DialogContent>
							<Paper>
						    	<CircularProgress />
							</Paper>
						</DialogContent>
					</Dialog>
				</div>
			);
		}
	}


}
export default PlayerInfoModal;