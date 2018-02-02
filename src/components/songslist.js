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
  {id: 2, song:'Swag se Swagat', artist: 'Visha lDadlani& Neha Bhaisin', album: 'Tiger Zinda Hai',audio: 'music/Swag Se Swagat-(SwagyJatt.CoM).mp3'},
  {id: 3, song:'Dil Chori', artist: 'Yo Yo Honey Singh', album: 'Sonu Ki Titu Ki Sweety' ,audio: 'music/Dil Chori - Sonu Ke Titu Ki Sweety 320Kbps.mp3'},
  {id: 4, song:'Dil Diyan Gallan', artist: 'Atif Aslam', album: 'Tiger Zinda Hai',audio: 'music/Dil Diyan Gallan-(SwagyJatt.CoM) (1).mp3'},
  {id: 5, song:'Swag se Swagat', artist: 'Visha lDadlani& Neha Bhaisin', album: 'Tiger Zinda Hai',audio: 'music/Swag Se Swagat-(SwagyJatt.CoM).mp3'},
  {id: 6, song:'Dil Chori', artist: 'Yo Yo Honey Singh', album: 'Sonu Ki Titu Ki Sweety' ,audio: 'music/Dil Chori - Sonu Ke Titu Ki Sweety 320Kbps.mp3'},
  {id: 7, song:'Swag se Swagat', artist: 'Visha lDadlani& Neha Bhaisin', album: 'Tiger Zinda Hai',audio: 'music/Swag Se Swagat-(SwagyJatt.CoM).mp3'},
  {id: 8, song:'Dil Chori', artist: 'Yo Yo Honey Singh', album: 'Sonu Ki Titu Ki Sweety' ,audio: 'music/Dil Chori - Sonu Ke Titu Ki Sweety 320Kbps.mp3'},
  {id: 9, song:'Swag se Swagat', artist: 'Visha lDadlani& Neha Bhaisin', album: 'Tiger Zinda Hai',audio: 'music/Swag Se Swagat-(SwagyJatt.CoM).mp3'},
  {id: 10, song:'Dil Chori', artist: 'Yo Yo Honey Singh', album: 'Sonu Ki Titu Ki Sweety' ,audio: 'music/Dil Chori - Sonu Ke Titu Ki Sweety 320Kbps.mp3'},
  {id: 11, song:'Swag se Swagat', artist: 'Visha lDadlani& Neha Bhaisin', album: 'Tiger Zinda Hai',audio: 'music/Swag Se Swagat-(SwagyJatt.CoM).mp3'},
  {id: 12, song:'Dil Chori', artist: 'Yo Yo Honey Singh', album: 'Sonu Ki Titu Ki Sweety' ,audio: 'music/Dil Chori - Sonu Ke Titu Ki Sweety 320Kbps.mp3'},
  {id: 13, song:'Swag se Swagat', artist: 'Visha lDadlani& Neha Bhaisin', album: 'Tiger Zinda Hai',audio: 'music/Swag Se Swagat-(SwagyJatt.CoM).mp3'},
  {id: 14, song:'Dil Chori', artist: 'Yo Yo Honey Singh', album: 'Sonu Ki Titu Ki Sweety' ,audio: 'music/Dil Chori - Sonu Ke Titu Ki Sweety 320Kbps.mp3'}

 
];

class SongList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      value: '',
      selected: false,
      playing: false,
      currentid: '',
      currentaudio: new Audio(),
      rowsPerPage: 5,
      page: 0
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
      value: id
    })
  }

  //hide play icon
  handleMouseLeave() {
     this.setState({
      value: ''
     })
  }

  handleChangePage = (event, page) => {
    this.setState({ page: page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes } =this.props;
    const { rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
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
               {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((chart)=> 
                <TableRow 
                  hover 
                  key={chart.id} 
                  onClick={(e)=>this.handleClick(chart.audio,chart.id)} 
                  onMouseEnter={(e)=> this.handleMouseEnter(chart.id,e)} 
                  onMouseLeave={this.handleMouseLeave}
                >
                   <TableCell>
                    {(this.state.value === chart.id) || (this.state.currentid === chart.id) ?
                      <IconButton style={{width: 20 ,height: 20}}>{(this.state.playing && this.state.currentid == chart.id)?<Pause/>:<PlayArrow/>}</IconButton>: 
                      (chart.id)}
                   </TableCell>
                   <TableCell>{chart.song}</TableCell>
                   <TableCell>{chart.artist}</TableCell>
                   <TableCell>{chart.album}</TableCell>
                 </TableRow>
               )}
               {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
                )}                                
              </TableBody>
               <TableFooter>
                 <TableRow>
                  <TablePagination
                    colSpan={6}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                      'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                      'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                </TableRow>
             </TableFooter>
          </Table>
        </Paper>
      );
  }
}

export default withStyles(styles)(SongList);