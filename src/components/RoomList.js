import React, { Component } from 'react';
// import NewRoomForm from './NewRoomForm';
class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: []
        };
        this.roomsRef = this.props.firebase.database().ref('rooms');
        this.newRoom = false;
    }
    

    componentDidMount() {  //part of React lifecyle
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({rooms: this.state.rooms.concat( room ) });
        })
        this.roomsRef.on('child_removed', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({rooms: this.state.rooms.filter(currentRoom => currentRoom.key !== room.key) });
        })
    }

    deleteRoom(roomID) {
        console.log(roomID);
        var recordReference = this.roomsRef.child(roomID);
        console.log(recordReference);
        recordReference.remove();
    }

    render () {
        
        return (
         <div>
            <div className = "room_list">
            <h1 className="title-line">Bloc Chat</h1>
            <button onClick={this.props.showNewRoom}>New Room</button>
            <ul>
                {this.state.rooms.map( (room, index) =>
                <div key = {index} >
                <li onClick={ (e) => this.props.setActiveRoom(room)}>{room.name}
               </li>
                    <button className= 'delete-button' onClick={(e)=>this.deleteRoom(room.key)}>Delete Room</button>
                    
                </div>
                )
                }
          </ul> 
          </div>
          {/* <div>
              { this.props.newRoom &&
              <NewRoomForm createRoom={() => this.createRoom()} />  }
            
            </div> */}
        </div>
        )
    }
}


export default RoomList;