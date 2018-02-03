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
            { type === 'text' && this.props.message}
            { type === 'text' && <TopCharts onClick={this.handleClick}/>}
            { type === 'text' && <SongsList/>}
            { type === 'text' && <Play/>}
            { type === 'text' && <Video/>}
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

//<iframe width="420" height="345" src="https://www.youtube.com/embed/tgbNymZ7vqY">
             //</iframe>