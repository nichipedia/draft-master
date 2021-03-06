import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DraftBoard from './components/DraftBoard';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Draft Master
            </Typography>
          </Toolbar>
        </AppBar>
        <DraftBoard/>
      </div>
    );
  }
}

export default App;
