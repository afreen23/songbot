import React from 'react';
import '../App.css';
import Play from './playsong';
import Video from './playvideo';
import TopCharts from './charts.js';
import SongsList from './songslist';
import Download from './download';

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
  //  var data ={
  //   list:"Aashiq banaya aapne <br/>Dil diyan gallan <br/>Lae dooba<br/>Swag se swagat<br/>Dil chori <br/>Khalibali<br/>Chhote chhote peg<br/>Binte dil<br/>Aaj se teri<br/>Nachle na<br/>Yaad hai <br/>Gazab ka hai din <br/>Ban ja rani<br/>Ghoomar <br/>Mere rashke qamar <br/>Ek dil ek jaan<br/>Phir bhi tumko chaahunga<br/>Nainowale ne<br/>Chalti hai kya 9 se <br/>Pallo latke hindi<br/>Main tera boyfriend<br/>Pal <br/>Mehbooba <br/>Suit suit<br/>Aa to sahi<br/>Nazm nazm<br/>Baarish <br/>Oonchi hai building <br/>Subah subah <br/>Humsafar <br/>Cheez badi<br/>Dil diyan gallan unplugged<br/>Roke na ruke naina<br/>Galti se mistake<br/>Ik vaari aa<br/>Sunn le zara<br/>Raabta title track<br/>Badri ki dulhania title track<br/>Thodi der<br/>Tamma tamma again<br/>Socha hai <br/>Maine tujhko dekha<br/>Main hoon saath tere<br/>Sweety tera drama<br/>Lag ja gale <br/>Ding dang <br/>Trippy trippy<br/>Laila main laila <br/>Zaalima <br/>Kuch iss tarah<br/>",
  //   name:"gaana",
  //   type:"bollywood top"
  // }
    return ( 
      <div className="bot-message">
        <div style={{backgroundColor: this.state.avatar}} className="bot-avatar"></div>
             <div className='bot-username-message'>
                <div className="username">{this.state.username}</div>
                <div className="message">
                  {this.props.message} 
                { /*type === 'charts' && <TopCharts charts={this.props.data} onClick={this.handleClick}/>*/}
                { type === 'charts' && <SongsList charts={this.props.data}/>}
                { type === 'audio' && <Play song={this.props.data}/>}
                { type === 'video' && <Video src={this.props.data}/>}
                { type === 'download' && <Download src={this.props.data}/>}
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

// (<div className="typing-indicator"> <span></span><span></span><span></span></div>):
        


