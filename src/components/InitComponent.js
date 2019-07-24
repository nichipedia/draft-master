import React, { Component } from 'react';
import Button from '@material-ui/core/Button'

class InitComponent extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
				<Button variant="contained" color="primary">
					Load Top 200 Players
				</Button>
			</div>
		);
	}
}