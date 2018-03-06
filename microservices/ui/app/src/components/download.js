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
	const { classes } =props;
	const src = "https://t1.youtube7.download/13/4a30f12ea804bc65b5f98b7a0af9e59c6f9d43e3/FGTv9-oQhIg";
	return (<div>
				<p><Button href={src} variant="fab"  className ={classes.button}>Downlaod<FileDownload/></Button></p>
			</div>);
}

export default withStyles(styles)(Download);