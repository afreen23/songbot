import React from 'react';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';


const styles=theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    filter:'drop-shadow(8px 8px 10px #232222)',
    background: 'rgba(0, 0, 0, 0.4)',
    width: 500,
  },
  table: {
    maxWidth: 500,
    color: 'white'
  },
  span: {
   fontSize: 20
  },
  cell: {
   color: theme.palette.background.paper,
     fontSize: 15,
  },
  head: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },

  footer: {
    background: '#ffffffa1',
    color: '#fff',
  }
});


class SongList extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      rowsPerPage: 5,
      page: 0,
      counter: 0
    };
  }

  //fetching song list
    componentWillMount() {
    var data = [];
    var counter =0;
    var recievedPropObject = this.props.charts;
    var chartsAsString = recievedPropObject["list"];
    var chartsAsArray = chartsAsString.split("<br/>");//storing charts in an array of strings
    chartsAsArray.pop();//removing empty string
    chartsAsArray.forEach((item) => {
      data=data.concat({id: ++counter, song: item});
    })
    this.setState({charts: data});
  }
 
  handleChangePage = (event, page) => {
    this.setState({ page: page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes } =this.props;
   
    const {rowsPerPage, page ,charts } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, charts.length - page * rowsPerPage);
    return (
        <Paper className={classes.root}>
          <Table className={classes.width}>
              <TableHead >
                <TableRow >
                  <TableCell className={classes.head}>#</TableCell>
                  <TableCell className={classes.head}>Song</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
               {charts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((chart , index)=> 
                <TableRow 
                  hover 
                  key={index} 
                >
                   <TableCell className={classes.cell}>{chart.id}</TableCell>
                   <TableCell className={classes.cell}>{chart.song}</TableCell>
                 </TableRow>
               )}
               {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
                )}                                
              </TableBody>
               <TableFooter className={classes.footer} >
                 <TableRow >
                  <TablePagination
                    classes={{
                      selectIcon: this.props.icon,
                      selectRoot: this.props.icon,
                      select: this.props.icon,
                      actions: this.props.icon,
                      root: this.props.icon,
                      toolbar: this.props.icon,
                      caption: this.props.icon
                    }}
                    colSpan={6}
                    count={charts.length}
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