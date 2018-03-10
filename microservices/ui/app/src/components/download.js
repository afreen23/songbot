import React from 'react';
import Button from 'material-ui/Button';
import FileDownload from 'material-ui-icons/FileDownload';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
	button: {
	  backgroundColor: '#d8c0ff99',
	  color: 'white',
	  borderRadius: '5px',
	  '&:hover': {
	  	backgroundColor: '#d8c0ff4d'
	  }
	}
});

const Download =(props) => {
	const { classes, src } =props;
	return (<div>
				<p><Button href={src} variant="fab"  className ={classes.button}>Download<FileDownload/></Button></p>
			</div>);
}

export default withStyles(styles)(Download);