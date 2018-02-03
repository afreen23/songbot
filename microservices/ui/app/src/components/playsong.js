import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import SkipNextIcon from 'material-ui-icons/SkipNext';
import GridList, { GridListTile } from 'material-ui/GridList';
import Pause from 'material-ui-icons/Pause';

const styles=theme=>({
     root: {
      width: 400,
      height: 400,
      fontSize: 'xx-large',
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid white',
      
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
        border: '1px solid red'
     },
     button: {
      marginTop: 80
     }
});



class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      first: false,
      isPlaying: false,
      currentSong: new Audio()
    };
    this.handleClick=this.handleClick.bind(this);
  }
  handleClick(audio) {
    let { isPlaying } = this.state;
     if(!this.state.first) {
      this.state.currentSong.src = audio;
      this.state.currentSong.play();
      this.setState({isPlaying: true,first: true});
      return;
     }
     if(isPlaying) {
      this.state.currentSong.pause();
      this.setState({isPlaying: false}) 
     }
     else {
       this.state.currentSong.play();
       this.setState({isPlaying: true})
     }
  }
  render() {
  const { classes, theme } = this.props;

  return (
  <GridList style={{marginTop: "10px"}} className={classes.root}>
     <GridListTile style={{width: 400, height: 400}} >
            <img alt="album art" src="images/despacito.jpg"  />
            <div className={classes.divi}>
              <Typography type='display1' style={{marginTop: 50, color: 'white'}}>Despacito</Typography>
              <IconButton className={classes.button} onClick={()=>this.handleClick("music/Dil Chori - Sonu Ke Titu Ki Sweety 320Kbps.mp3")}>
                {this.state.isPlaying?
                 <Pause style={{width: 125, height: 150, color: 'white'}}/>:
                 <PlayArrowIcon style={{width: 150, height: 150, color: 'white'}}/>
               }
              </IconButton>
            </div>
            
          </GridListTile>
   </GridList>

  );
}
}

Play.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Play);
/*
 <CardMedia
          className={classes.cover}
          image="images/thunder.jpeg"
          title="Live from space album cover"
        />
*/