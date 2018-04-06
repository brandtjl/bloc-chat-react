import React, { Component } from 'react';
import NewRoomForm from './NewRoomForm';
class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: []
        };
        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.newRoom = false;
        this.showNewRoom = this.showNewRoom.bind(this);
    }
    

    componentDidMount() {  //part of React lifecyle
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({rooms: this.state.rooms.concat( room ) });
        })
    }

    showNewRoom() {
        this.setState( {newRoom: true });
    }

    createRoom() {
        var newRoomName = document.getElementById('newRoom').value;
        this.roomsRef.push({
            name: newRoomName,
        });
    }
    render () {
        
        return (
         <div>
            <div className = "room_list">
            <h1 className="title-line">Bloc Chat</h1>
            <button onClick={this.showNewRoom}>New Room</button>
            <ul>
                {this.state.rooms.map( (room, index) =>
                <li key = {index} onClick={this.props.setActiveRoom}>{room.name}</li>
                )
                }
          </ul> 
          </div>
          <div>
              { this.state.newRoom &&
              <NewRoomForm createRoom={() => this.createRoom()} />  }
            
            </div>
        </div>
        )
    }
}


export default RoomList;