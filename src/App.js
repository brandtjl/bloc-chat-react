import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase} /> 
      </div>
    );
  }
}

export default App;
