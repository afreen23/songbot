import React from 'react';
import '../App.css';
import Play from './playsong';
import Video from './playvideo';
import SongsList from './songslist';
import Download from './download';


class ChatBotMessage extends React.Component {

  constructor(props){
      super(props)
      this.state = {avatar: "rgb(0, 212, 175)", username: "Bot" ,type: ''  }
    }

  render() {
    var type= this.props.mtype;
      return ( 
        <div className="bot-message">
          <div style={{backgroundColor: this.state.avatar}} className="bot-avatar"></div>
               <div className='bot-username-message'>
                  <div className="username">{this.state.username}</div>
                  <div className="message">
                    {this.props.message}   
                    { type === 'charts' && <SongsList charts={this.props.data}/>}
                    { type === 'audio' && <Play key={this.props.index} song={this.props.data}/>}
                    { type === 'video' && <Video src={this.props.data}/>}
                    { type === 'download' && <Download src={this.props.data}/>}
                  </div>
                </div>
          </div>
      )
    }
}

export default ChatBotMessage;
         



        


