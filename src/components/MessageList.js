import React, { Component } from 'react';
import Moment from 'react-moment';
import ContentEditable from 'react-contenteditable';

class MessageList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [] 
        };
        this.messageRef = this.props.firebase.database().ref('messages');
        this.deleteMessage = this.deleteMessage.bind(this);
    }

    componentDidMount(curMessage, e) {
        // this.messageRef.on('child_changed', snapshot => {
        //     console.log('child_changed method executed')
        //     const msg = snapshot.val();
        //     msg.key = snapshot.key;
        //     const curmsg = this.state.messages.find((currentMsg) => currentMsg.key === msg.key);
        //     //create copy of this.state.messages(slice), map over copy, find matching id, change .content, set this.setState to new copy
        //     // var updatedMessages = this.state.messages.slice();
        //     // console.log(updatedMessages);
        //     // updatedMessages = this.state.messages.map((arrayMessage, index) => arrayMessage.key === msg.key ? arrayMessage.content = curmsg : null)
        //         /* above. . . if it matches msg.key, change content property*/
        //     // console.log(updatedMessages);
        //                 // this.setState({messages.key.content: curMessage});
        // }) 
        this.messageRef.on('child_added', snapshot => {
            const msg = snapshot.val();
            msg.key = snapshot.key;
            this.setState({messages: this.state.messages.concat( msg ) });
        })
        this.messageRef.on('child_removed', snapshot => {
            const msg = snapshot.val();
            msg.key = snapshot.key; 
            this.setState({messages: this.state.messages.filter(currentMessage => currentMessage.key !== msg.key)});
            // 'currentMessage' in the line above is just a placeholder for message as it filters through array
            
        })
    }

    newMessage() {
        var newMsg = document.getElementById('newMsg').value;
        this.messageRef.push({
            content: newMsg,
            roomID: this.props.activeRoom.key,
            sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
            username: this.props.user.displayName
        });
        document.getElementById('newMsg').value = '';
    }

    deleteMessage(message_id) {
        console.log(message_id);
        var recordReference = this.messageRef.child(message_id);
        console.log(recordReference);
        recordReference.remove();
        //need to force re-render?  added 'listener' for child_removed event
    }

    modifyMessage(message_id,e) {
        // var editable=document.getElementById('text');
        // editable.addEventListener('input', function() {
            // console.log('text changed');
        // });
        // console.log(message_id);
        // const curMessage=e.target.value;
        // const msg = this.state.messages.find((currentMsg) => currentMsg.key === message_id);
        // const msgReference = Object.assign({},msg);
        // msgReference.content = curMessage;
        // msgReference.set({content: curMessage});
        // console.log(msgReference);
        this.props.firebase.database().ref('messages/'+message_id).update({content:e.target.value});
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
                <ContentEditable html={message.content} onChange={(e) => this.modifyMessage(message.key,e)}
                // <div contentEditable='true' id='text' onChange={(e)=>this.modifyMessage(message.key)}>
                // {message.content}
                // </div>
                />  
                <button className='delete' onClick={(e)=>this.deleteMessage(message.key)}>Delete</button>
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