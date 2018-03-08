import React from 'react';
import '../App.css';


class UserMessage extends React.Component {
constructor(){
    super()
    this.state = {avatar: "rgb(212, 0, 116)", username: "Me"}
  }
render() {
    return (
      <div className="bot-message">
        <div style={{backgroundColor: this.state.avatar}} className="bot-avatar"></div>
        <div className='bot-username-message'>
        <div className="username">{this.state.username}</div>
        <div className="message">{this.props.message}</div></div>
      </div>
    )
  }
}

export default UserMessage;