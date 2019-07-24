import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class DraftMaster extends Component {


  constructor(props) {
    super(props);
    this.state = {
      initialized: false
    };
  }

  render() {
    let view = null;
    if (this.state.initialized) {
      view = null;
    } else {
      view = <InitComponent />;
    }
    return (
      {view}
    );
  }
}

export default App;