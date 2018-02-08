import React from 'react';
import '../App.css';
import Play from './playsong';
import Video from './playvideo';
import TopCharts from './charts.js';
import SongsList from './songslist';

class ChatBotMessage extends React.Component {
constructor(props){
    super(props)
    this.state = {avatar: "rgb(0, 212, 175)", username: "Bot" ,type: ''  }
    this.handleClick=this.handleClick.bind(this);
  }
handleClick(e) {
  
}  
render() {
   var type= this.props.mtype;
    return (
      <div className="bot-message">
        <div style={{backgroundColor: this.state.avatar}} className="bot-avatar"></div>
        <div className='bot-username-message'>
          <div className="username">{this.state.username}</div>
           <div className="message">
            { this.props.message}
            { /*type === 'charts' && <TopCharts charts={this.props.data} onClick={this.handleClick}/>*/}
            { type === 'charts' && <SongsList charts={this.props.data}/>}
            { type === 'audio' && <Play song={this.props.data}/>}
            { type === 'video' && <Video src={this.props.data}/>}
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
