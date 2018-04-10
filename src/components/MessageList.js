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
        return (
            <div className = 'msgList'>
                        <h3>{this.props.activeRoom.name}</h3>
                    {this.state.messages.filter(item => item.roomID === this.props.activeRoom.key ).map(
                        (message, index) => //honestly, kinda confused about this one
                   <div key = {index}>
                        <ul className= 'messageList'>
                            <li>{message.username}
                            <span className='msgTime'>{message.sentAt}</span>
                            <br></br>
                            {message.content}
                            </li>
                        </ul> 
                        </div>
                    )}
           </div>
        )
    }
}

export default MessageList;