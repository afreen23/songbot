import React from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import Play from './playsong';
import TopCharts from './charts.js';
import SongsList from './songslist';
import { Scrollbars } from 'react-custom-scrollbars';

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
           <div className="message">
            { this.props.mtype=== 'text' && this.props.message}
            { this.props.mtype=== 'songs' && <TopCharts/>}
            { this.props.mtype=== 'charts' && <SongsList/>}
          </div>
        </div>
      </div>
    )
  }
}

export default ChatBotMessage;
//options: text/charts/songs

//options: text/charts/songscd songbio

//if message === top [charts] => <List>
//if message === song => play song + ui 

