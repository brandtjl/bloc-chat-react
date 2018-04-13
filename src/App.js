import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
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
      //do not need to set activeRoom if setting to blank, this.setState will declare and set later
    };
    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setUser= this.setUser.bind(this);
  }

  setActiveRoom(room) {
    this.setState( {activeRoom: room} );
  }
  
  setUser(user){
    this.setState( {user: user});
  }
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase} setActiveRoom ={this.setActiveRoom}/> 
        <User firebase={firebase} setUser={this.setUser} user={this.state.user}/>
        {/* next line begins with curly brackets, in React this means 'following code will be javascript' */}
        {this.state.activeRoom ? <MessageList firebase={firebase} activeRoom={this.state.activeRoom} user={this.state.user}/> : null}
        
        
      </div>
    );
  }
}

export default App;
