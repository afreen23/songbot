import React from 'react';
import ReactDOM from 'react-dom';
import '../App.css';


class ChatBotMessage extends React.Component {
constructor(){
    super()
    this.state = {avatar: "rgb(0, 212, 175)", username: "Bot", message: "Hey! What's up?"}
  }
render() {
    return (
      <div className="bot-message">
        <div style={{backgroundColor: this.state.avatar}} className="bot-avatar"></div>
        <div className='bot-username-message'>
        <div className="username">{this.state.username}</div>
        <div className="message">{this.state.message}</div></div>
      </div>
    )
  }
}

export default ChatBotMessage;