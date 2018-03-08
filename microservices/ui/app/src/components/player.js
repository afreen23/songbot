import React from 'react';
import '../App.css';
import Stop from 'material-ui-icons/Stop';
import Info from 'material-ui-icons/Info';
import Tooltip from 'material-ui/Tooltip';

const style = {
  player:{
    marginTop:"80px",
    position:"relative"
  },
  player__info: {
  position:"absolute",
  height:"60px",
  top:"0",
  opacity:"0",
  left:"10px",
  right:"10px",
  backgroundColor:"rgba(255, 255, 255, 0.5)",
  padding:"5px 15px 5px 110px",borderRadius:"15px",
  transition:"all .5s ease"
  },
  player__info__artist:{
    display:"block"
  },
  player__info__name:{
    color:"#222",
    fontSize:"16px",marginBottom:"14px"
  },
  player__info__progress_bar:{
    backgroundColor:"#ddd",
    height:"2px",
    width:"100%",
    position:"relative"
  },
  player__info__bar:{
    position:"absolute",left:"0",
    top:"0",bottom:"0",
    backgroundColor:"red",
    width:"0%",
    transition:"all .2s ease"
  },
  player__info_active:{
    top:"-60px",
    opacity:"1","transition":"all .5s ease"
  },
  player__control_panel:{
    position:"relative",backgroundColor:"#fff",borderRadius:"15px",width:"300px",height:"80px",zIndex:"5",boxShadow:"0px 20px 20px 5px rgba(132, 132, 132, 0.3)"},
    player__control_panel__album_art:{
      position:"absolute",left:"20px",top:"-15px",height:"80px",width:"80px",borderRadius:"50%",boxShadow:"0px 0px 20px 5px rgba(0, 0, 0, 0)",transform:"scale(1)",transition:"all .5s ease"},
      player__control_panel__album_art__after:{
        content:"''",position:"absolute",top:"50%",left:"50%",width:"15px",height:"15px",backgroundColor:"#fff",borderRadius:"50%",zIndex:"5",transform:"translate(-50%, -50%)","WebkitTransform":"translate(-50%, -50%)"},
        "player__control_panel__album_art__before":{
          "content":"''","position":"absolute","top":"0","left":"0","right":"0","bottom":"0","borderRadius":"50%","backgroundPosition":"center","backgroundRepeat":"no-repeat","backgroundSize":"80px","backgroundImage":"url(\"fume.jpeg\")"},
          "player__control_panel_active__album_art":{"boxShadow":"0px 0px 20px 5px rgba(0, 0, 0, 0.2)","transform":"scale(1.2)","transition":"all .5s ease"},
          "player__control_panel_active__album_art__before":{"animation":"rotation 3s infinite linear","WebkitAnimation":"rotation 3s infinite linear","animationFillMode":"forwards"},
          "player__control_panel__controls":{"display":"flex","justifyContent":"flex-end","height":"80px","padding":"0 15px"},"player__control_panel__controls__prev":{"width":"55px","height":"auto","borderRadius":"10px","backgroundPosition":"center center","backgroundRepeat":"no-repeat","backgroundSize":"20px","margin":"5px 0","backgroundColor":"#fff","cursor":"pointer","transition":"background-color .3s ease","WebkitTransition":"background-color .3s ease"},"player__control_panel__controls__play":{"backgroundImage":"url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDIzMi4xNTMgMjMyLjE1MyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjMyLjE1MyAyMzIuMTUzOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjEyOHB4IiBoZWlnaHQ9IjEyOHB4Ij4KPGcgaWQ9IlBsYXkiPgoJPHBhdGggc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkOyIgZD0iTTIwMy43OTEsOTkuNjI4TDQ5LjMwNywyLjI5NGMtNC41NjctMi43MTktMTAuMjM4LTIuMjY2LTE0LjUyMS0yLjI2NiAgIGMtMTcuMTMyLDAtMTcuMDU2LDEzLjIyNy0xNy4wNTYsMTYuNTc4djE5OC45NGMwLDIuODMzLTAuMDc1LDE2LjU3OSwxNy4wNTYsMTYuNTc5YzQuMjgzLDAsOS45NTUsMC40NTEsMTQuNTIxLTIuMjY3ICAgbDE1NC40ODMtOTcuMzMzYzEyLjY4LTcuNTQ1LDEwLjQ4OS0xNi40NDksMTAuNDg5LTE2LjQ0OVMyMTYuNDcxLDEwNy4xNzIsMjAzLjc5MSw5OS42Mjh6IiBmaWxsPSIjYzJjNmNmIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==)"},"player__control_panel__controls__next":{"width":"55px","height":"auto","borderRadius":"10px","backgroundPosition":"center center","backgroundRepeat":"no-repeat","backgroundSize":"20px","margin":"5px 0","backgroundColor":"#fff","cursor":"pointer","transition":"background-color .3s ease","WebkitTransition":"background-color .3s ease"},"player__control_panel__controls__prev_hover":{"backgroundColor":"#eee","transition":"background-color .3s ease","WebkitTransition":"background-color .3s ease"},"player__control_panel__controls__play_hover":{"backgroundColor":"#eee","transition":"background-color .3s ease","WebkitTransition":"background-color .3s ease"},"player__control_panel__controls__next_hover":{"backgroundColor":"#eee","transition":"background-color .3s ease","WebkitTransition":"background-color .3s ease"},"prev":{"color":"#C2C6CF"},"player__control_panel_active__controls__play":{"backgroundImage":"url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDIzMi42NzkgMjMyLjY3OSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjMyLjY3OSAyMzIuNjc5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjEyOHB4IiBoZWlnaHQ9IjEyOHB4Ij4KPGcgaWQ9IlBhdXNlIj4KCTxwYXRoIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDsiIGQ9Ik04MC41NDMsMEgzNS43OTdjLTkuODg1LDAtMTcuODk4LDguMDE0LTE3Ljg5OCwxNy44OTh2MTk2Ljg4MyAgIGMwLDkuODg1LDguMDEzLDE3Ljg5OCwxNy44OTgsMTcuODk4aDQ0Ljc0NmM5Ljg4NSwwLDE3Ljg5OC04LjAxMywxNy44OTgtMTcuODk4VjE3Ljg5OEM5OC40NCw4LjAxNCw5MC40MjcsMCw4MC41NDMsMHogTTE5Ni44ODIsMCAgIGgtNDQuNzQ2Yy05Ljg4NiwwLTE3Ljg5OSw4LjAxNC0xNy44OTksMTcuODk4djE5Ni44ODNjMCw5Ljg4NSw4LjAxMywxNy44OTgsMTcuODk5LDE3Ljg5OGg0NC43NDYgICBjOS44ODUsMCwxNy44OTgtOC4wMTMsMTcuODk4LTE3Ljg5OFYxNy44OThDMjE0Ljc4MSw4LjAxNCwyMDYuNzY3LDAsMTk2Ljg4MiwweiIgZmlsbD0iI2MyYzZjZiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=)"}}

}

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      currentSong: new Audio(),
      isPlaying: false,
      first: true,
      active : false,
      index: ''
    }
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
  } 
play() {
    let { index,currentSong,isPlaying,first} = this.state;
    let controlPanelObj = document.getElementById(`info${index}`);
    let infoBarObj = document.getElementById(`control-panel${index}`); 
    let player =document.getElementById('player');
    console.log(controlPanelObj)
    console.log(infoBarObj) 
      // Array.from(controlPanelObj.classList).find(function(element){
      //       console.log(element)
      //       console.log(controlPanelObj.classList)
      //       return element !== "active" ? controlPanelObj.classList.add('active') :     controlPanelObj.classList.remove('active');
      //   });   
      // Array.from(infoBarObj.classList).find(function(element){
      //       return element !== "active" ? infoBarObj.classList.add('active') :    infoBarObj.classList.remove('active');
      //   })
    if(first) {
      let audio =currentSong;
      audio.src = this.props.song['audiosrc'];
      audio.addEventListener('timeupdate', () => {
        let progressBar = document.getElementById('progres');
        var audio = this.state.currentSong;
        var barlength = Math.round(audio.currentTime * (100 / audio.duration));
        progressBar.style.width = barlength + '%';
      });
      audio.addEventListener('ended', () => {
      var audio = this.state.currentSong;
      Array.from(controlPanelObj.classList).find(function(element){
      return element !== "active" ? controlPanelObj.classList.add('active') : controlPanelObj.classList.remove('active');
      });
      Array.from(infoBarObj.classList).find(function(element){
      return element !== "active" ? infoBarObj.classList.add('active') : infoBarObj.classList.remove('active');
      });
        this.setState({isPlaying: false});
      });
      // audio.addEventListener('mousedown' ,()=> {
      //     var audio =this.state.currentSong
      //     audio.currentTime = audio.duration * (value / 100);
      // })
      this.setState({
        first: false,
        isPlaying: true,
        currentSong: audio,
      })
      currentSong.play();
      console.log(currentSong);
    }
    else if(isPlaying) {
      currentSong.pause();
      this.setState({isPlaying: false})
    }
    else {
      currentSong.play();
      this.setState({isPlaying: true});
    }
  }

stop() {
  var { currentSong , isPlaying } =this.state;
   let controlPanelObj = document.getElementById('control-panel');
    let infoBarObj = document.getElementById('info'); 
  if(isPlaying) {
    currentSong.pause();
    currentSong.currentTime =0;
        Array.from(controlPanelObj.classList).find(function(element){
            console.log(element)
            console.log(controlPanelObj.classList)
            return element !== "active" ? controlPanelObj.classList.add('active') :     controlPanelObj.classList.remove('active');
        });
      
      Array.from(infoBarObj.classList).find(function(element){

            return element !== "active" ? infoBarObj.classList.add('active') :    infoBarObj.classList.remove('active');
        })
      this.setState({isPlaying: false});}
}
  
  render() {
var { name } = this.props.song;
var index = this.props.index;
var id =`info${index}`;
var control = `control-panel${index}`
  return (

<div className="player" id="player">
  <div id={id} className="info">
    <span className="name">{name}</span>
    <div className="progress-bar"  >
      <div className="bar" id="progres"></div>
    </div>
  </div>
  <div id={control} className="control-panel">
    <div className="album-art"></div>
    <div className="controls">
      <div className="next" onClick = {this.stop}><Stop style={{color: '#C2C6CF', marginTop: '17px',width: '35px', height: '35px'}}/></div>
      <div id="play" className="play" onClick ={this.play}></div>
      <div className="prev"><Tooltip title ={name}><Info style={{color: '#C2C6CF', marginTop: '21px', marginLeft: '12px' ,width: '27px', height: '27px'}}/></Tooltip></div>
    </div>
  </div>
</div>
  );
}
}



export default Play;

