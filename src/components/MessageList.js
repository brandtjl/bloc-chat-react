import React, { Component } from 'react';
import Moment from 'react-moment';

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

    newMessage() {
        var newMsgRoom = this.props.activeRoom.key;
        var newMsg = document.getElementById('newMsg').value;
        this.messageRef.push({
            content: newMsg,
            roomID: this.props.activeRoom.key,
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
            username: this.props.user.displayName
        });
        document.getElementById('newMsg').value = '';
    }

    render() {
        const filteredMessages = this.state.messages.filter(item => item.roomID === this.props.activeRoom.key);
        const html = filteredMessages.map(
            (message, index) => //implicit return because it's basically one line (<div> to </div>)
       <div key = {index}>
            <ul className= 'messageList'>
                <li>{message.username}
                <span className='msgTime'>
                    <Moment format="lll">{message.sentAt}</Moment>
                </span>
                <br></br>
                {message.content}
                </li>
            </ul> 
            </div>
        )
        return (
            <div className = 'msgList'>
                        <h3>{this.props.activeRoom.name}</h3>
                    {html}
                    <input type='text' id='newMsg' width='125' height='65'></input>
                    <button className='createMsg' onClick={()=>this.newMessage()}>Send</button>
           </div>
        )
    }
}

export default MessageList;