import React from 'react';
import ReactDOM from 'react-dom';
import '../App.css';

import data from './data.json';
console.log(data);

class ChatBotMessage extends React.Component {
constructor(props){
    super(props)
    this.state = {avatar: "rgb(0, 212, 175)", username: "Bot"}
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

export default ChatBotMessage;