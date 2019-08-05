import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class DraftedPlayers extends Component {

	createData(name, calories, fat, carbs, protein) {
	  return { name, calories, fat, carbs, protein };
	}

	render() {
		return (
			<Paper>
			<Table>
				<TableHead>
		          <TableRow>
		            <TableCell>Name</TableCell>
		            <TableCell>Pos</TableCell>
		            <TableCell>Bye</TableCell>
		            <TableCell>Team</TableCell>
		          </TableRow>
		        </TableHead>
		         <TableBody>
		          {this.props.draftedPlayers.map(row => (
		            <TableRow key={row.name}>
		              <TableCell>
		                {row.name}
		              </TableCell>
		              <TableCell align="right">{row.pos}</TableCell>
		              <TableCell align="right">{row.bye}</TableCell>
		              <TableCell align="right">{row.team}</TableCell>
		            </TableRow>
		          ))}
		        </TableBody>
			</Table>
		</Paper>);
	}

}
export default DraftedPlayers;