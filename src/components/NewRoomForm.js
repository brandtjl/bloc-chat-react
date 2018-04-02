import React, {Component} from 'react';

class NewRoomForm extends Component {
    
    render() {
        return (
            <div id='newform'>
                <form onSubmit={ (e) => this.props.createRoom() }>
                    <h3>Create new room</h3>
                    <label>
                        Enter a room name
                    </label>
                    <input type='text' id="newRoom"/>
                    <input type='submit' value='Cancel' />
                    <input type='submit' value='Create Room' />
                </form>
            </div>
        );
    }
}

export default NewRoomForm;