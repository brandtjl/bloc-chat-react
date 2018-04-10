import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyAsjcByo53hH2aoqkkFpdCnBUUhBoTrUBM",
  authDomain: "bloc-chat-react-57147.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-57147.firebaseio.com",
  projectId: "bloc-chat-react-57147",
  storageBucket: "bloc-chat-react-57147.appspot.com",
  messagingSenderId: "896477755396"
};
firebase.initializeApp(config);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeRoom: {
        key: '',
        name: ' ',
      }
    };
    this.setActiveRoom = this.setActiveRoom.bind(this);
  }

  setActiveRoom(room) {
    console.log(room);
    this.setState( {activeRoom: room} );
    console.log(this.state);
  }
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase} setActiveRoom ={this.setActiveRoom}/> 
          <MessageList firebase={firebase} activeRoom={this.state.activeRoom} />
      </div>
    );
  }
}

export default App;
