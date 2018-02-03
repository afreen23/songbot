import React from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import GridList, { GridListTile } from 'material-ui/GridList';
import ListSubheader from 'material-ui/List/ListSubheader';

const styles=theme=>({
     root: {
     	height: 192,
     	fontSize: 'xx-large',
     	
     	position: 'relative'
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
		    //border: '1px solid red'
     }
});



class TopCharts extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick=this.handleClick.bind(this);
	}

	handleClick(chartName) {
        //this.props.onClick(chartName)
	}

	render() {
	const data=[
	{img: 'images/holly.jpeg', title: 'International Top 50'},
	{img: 'images/bolly.webp', title: 'Bollywood Top 50'},
	{img: 'images/trending.jpeg',title: 'Trending'},
	{img: 'images/despacito.jpg',title: 'Weekly Hot 20'},
	{img: 'images/viral.jpeg',title: 'Global Daily Viral'},
	{img: 'images/weekly.png',title: 'Global Weekly Viral'},
	{img: 'images/SpotifyStreams.jpg',title: 'Global Top Daily'},
	{img: 'images/americantop40.jpg',title: 'American Top 40'},
	{img: 'images/havana.jpeg',title: 'Hot Ac'}
];
	const {classes} =this.props;
		return (
				<GridList spacing={8} style={{marginTop: 10}}>
				   <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
				       <ListSubheader><Typography type='display1' style={{ color: 'white'}} >Top Charts</Typography></ListSubheader>
				   </GridListTile>
				    {data.map((datum,index) => (
				    <GridListTile onClick={(e)=>this.handleClick(datum.title)} key={index} style={{width: 200}} >
						<img alt="album art" src={datum.img}  />
						<div className={classes.divi}>
							<Typography type='headline' style={{marginTop: 50, color: 'white'}}>{datum.title}</Typography>
						</div>
					</GridListTile>
				    ))}
					
				</GridList>
			)
	}
}

export default withStyles(styles)(TopCharts);