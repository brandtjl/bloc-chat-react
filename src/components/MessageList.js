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
        const filteredMessages = this.state.messages.filter(item => item.roomID === this.props.activeRoom.key);
        const html = filteredMessages.map(
            (message, index) => //implicit return because it's basically one line (<div> to </div>)
       <div key = {index}>
            <ul className= 'messageList'>
                <li>{message.username}
                <span className='msgTime'>{message.sentAt}</span>
                <br></br>
                {message.content}
                </li>
            </ul> 
            </div>
        )
        console.log(html);
        return (
            <div className = 'msgList'>
                        <h3>{this.props.activeRoom.name}</h3>
                    {html}
           </div>
        )
    }
}

export default MessageList;