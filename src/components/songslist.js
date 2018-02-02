import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import DeleteIcon from 'material-ui-icons/Delete';
import FilterListIcon from 'material-ui-icons/FilterList';
import { lighten } from 'material-ui/styles/colorManipulator';
import PlayArrow from 'material-ui-icons/PlayArrow';
import Pause from 'material-ui-icons/Pause';

const styles=theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700,
  },
  span: {
   fontSize: 20
  }
});

const data=[
  {id: 1, song:'Dil Diyan Gallan', artist: 'Atif Aslam', album: 'Tiger Zinda Hai',audio: 'music/Dil Diyan Gallan-(SwagyJatt.CoM) (1).mp3'},
  {id: 2, song:'Dil Diyan Gallan', artist: 'Atif Aslam', album: 'Tiger Zinda Hai', album: 'Tiger Zinda Hai',audio: 'music/Dil Diyan Gallan-(SwagyJatt.CoM) (1).mp3'},
  {id: 3, song:'Dil Diyan Gallan', artist: 'Atif Aslam', album: 'Tiger Zinda Hai', album: 'Tiger Zinda Hai',audio: 'music/Dil Diyan Gallan-(SwagyJatt.CoM) (1).mp3'}

 
];

class SongList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      hover: false,
      value: '',
      selected: false,
      playing: false,
      currentid: '',
      currentaudio: new Audio()
    };
   this.handleMouseEnter=this.handleMouseEnter.bind(this);
   this.handleMouseLeave=this.handleMouseLeave.bind(this);
   this.handleClick =this.handleClick.bind(this);
  }
  //create song
 
  //play song
  handleClick(audio,id) {
  
      if(this.state.currentid === '' || this.state.currentid !== id) {
         this.state.currentaudio.src= audio;
         this.setState({currentid: id, })
      }
      if(this.state.playing){
         this.state.currentaudio.pause();
         this.setState({playing: false})
         return;
      }
      this.state.currentaudio.play();
      this.setState({playing: true, })
  }
  
  //show play icon
  handleMouseEnter(id , e) {
    this.setState({
      hover: true,
      value: id
    })
  }

  //hide play icon
  handleMouseLeave() {
     this.setState({
      hover: false,
      value: ''
     })
  }
  render() {
    const { classes } =this.props;
    return (
        <Paper className={classes.root}>
          <Table className={classes.width}>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Song</TableCell>
                  <TableCell>Artist</TableCell>
                  <TableCell>Album</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
               {data.map((chart)=> 
                <TableRow 
                  hover 
                  key={chart.id} 
                  onClick={(e)=>this.handleClick(chart.audio,chart.id)} 
                  onMouseEnter={(e)=> this.handleMouseEnter(chart.id,e)} 
                  onMouseLeave={this.handleMouseLeave}
                >
                   <TableCell>
                    {(this.state.value === chart.id) || (this.state.currentid === chart.id) ?
                      <IconButton style={{width: 20 ,height: 20}}>{this.state.playing?<Pause/>:<PlayArrow/>}</IconButton>: 
                      (chart.id)}
                   </TableCell>
                   <TableCell>{chart.song}</TableCell>
                   <TableCell>{chart.artist}</TableCell>
                   <TableCell>{chart.album}</TableCell>
                 </TableRow>
               )}                                
              </TableBody>
          </Table>
        </Paper>
      );
  }
}

export default withStyles(styles)(SongList);