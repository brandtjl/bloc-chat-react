import React, {Component} from 'react';
class User extends Component {
    
    componentDidMount() {  //part of React lifecyle
        this.props.firebase.auth().onAuthStateChanged( user => {
            this.props.setUser(user);
        });
        }
  
    
    render() {
        const provider = new this.props.firebase.auth.GoogleAuthProvider();
        const currentUser = !this.props.user ? 'Guest': this.props.user.displayName;
        return (
        <div className='buttons'>
        {currentUser !== 'Guest' ? null : 
            <button type='button' onClick={()=>this.props.firebase.auth().signInWithPopup( provider )}>
            Sign In
            </button>
         }
            
        {currentUser === 'Guest' ? null : 
        <button type='button' onClick={()=>this.props.firebase.auth().signOut()}>Sign Out
        </button>}
        <div className='username'>
            {currentUser}
        </div>
        </div>
        )
    }
}


export default User;