import React, { Component } from 'react';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [] 
        };
        this.messageRef = this.props.firebase.database().ref('messages');
    }

    componentDidMount() {
        this.messageRef.on('child_added', snapshot => {
            const msg = snapshot.val();
            msg.key = snapshot.key;
            this.setState({messages: this.state.messages.concat( msg ) });
        })
    }

    render() {
        const propsRoom = this.props.activeRoom;
        return (
            <div className = 'msgList'>
                        <h3>{propsRoom} </h3>
                    {this.state.messages.filter(item => item.roomID === this.props.activeRoom ).map(
                        (message, index) => 
                        <div key = {index}>
                        <ul>
                            <li>{index}{this.props.activeRoom}{message.content}</li>
                        </ul> 
                        </div>
                    )}
            </div>
        )
    }
}

export default MessageList;