import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ButtonBase from 'material-ui/ButtonBase';
import Typography from 'material-ui/Typography';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import Pause from 'material-ui-icons/Pause';
import Replay from 'material-ui-icons/Replay';

const styles=theme=>({
     root: {
      width: 400,
      height: 400,
      overflow: 'hidden',
      position: 'relative',
      filter:'drop-shadow(8px 8px 10px #232222)',
      // border: '1px solid white',
      
     },
     divi: {
        padding: 10, 
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        textAlign: 'center',
        background: 'rgba(0, 0, 0, 0.4)',
        //transform: 'translate(-50%, -50%)',
        // border: '1px solid red'
     },
     button: {
      marginTop: 80,
      // border: '1px solid white',
      padding: 0
     },
     playPause: {
      padding: 0,
      width: 125, 
      height: 150, 
      color: '#ffffffbf',
      // border: '1px solid red'
     },
     albumart: {
      backgroundSize: 'cover',
      backgroundPosition: 'center'
     }
});

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      first: true,
      value: 1,
      currentSong: new Audio()
    };
    this.handleClick=this.handleClick.bind(this);
  }

  handleClick(audio) {
     // document.body.style.background = `url(${audio['albumart']}) no-repeat fixed center`;
     let { value } = this.state;
     if(this.state.first) {
      var song = this.state.currentSong;
      song.src = audio['audiosrc'];
      song.addEventListener('ended' , () => {
        this.setState({value: 2});//2: Replay
        console.log('ended');
      })
      this.setState({value:0,first: false,currentSong: song});//0:pause
      this.state.currentSong.play();
      return;
     }
     else if(value === 0) {
      this.state.currentSong.pause();
      this.setState({value: 1}) 
     }
     else if(value === 2) {//2: Replay
      this.state.currentSong.play();
      this.setState({value: 0});
     }
     else {
       this.state.currentSong.play();
       this.setState({value: 0})
     }
  }
  render() {
  const { classes} = this.props;
  let {value} = this.state;
  return (
 
  <div style={{marginTop: "10px"}} className={classes.root}>
     <div style={{width: 400, height: 400}} >
            <img style={{width: 400, height: 400}} alt="album art" className={classes.albumart} src='309591848.jpg'  />
            <div className={classes.divi}>
              <Typography  variant='headline' style={{marginTop: 10, color: '#ffffffe3', fontSize: '1.5rem'}}>{this.props.song["name"]}</Typography>
              <div><ButtonBase  disableRipple className={classes.button} onClick={()=>this.handleClick(this.props.song)}>
                {(value === 0) && <Pause className={classes.playPause}/>}
                {(value === 1) && <PlayArrowIcon className={classes.playPause}/>}
                {(value === 2) && <Replay className={classes.playPause}/>}
              </ButtonBase></div>
             {/* <input type="range" id="seek" value="0" max=""/>*/}
            </div>
            
          </div>
   </div>

  );
}
}

Play.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Play);
