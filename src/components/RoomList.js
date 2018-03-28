import React, { Component } from 'react';

class RoomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: []
        };
        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            console.log(room);
            this.setState({rooms: this.state.rooms.concat( room ) });
        })
    }
    render () {
        return (
         <body>
            <div className = "room_list">
            <h1>Bloc Chat</h1>
            <ul>
                {this.state.rooms.map( (room, index) =>
                <li key = {index}>{room.name}</li>
                )

                }
         
           
          </ul> 
          </div>
        </body>
        )
    }
}


export default RoomList;