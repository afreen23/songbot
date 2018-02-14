import React from 'react';
import {withStyles} from 'material-ui/styles';

const styles= theme => ({
	root:{
		marginTop: "10px",
		width: '100%',
		// border: '1px solid white'
	}
});

const Video = (props) => {
	const {classes , src} =props;
	const url = src;
	return (
			<div className={classes.root}>
				<iframe 
					title="youtube viseo player"
					//type="text/html" 
				    width="100%" 
				    height="385" 
				    src={props.src}
				    frameBorder="0"
				    allowFullScreen
				    >
				</iframe>
			</div>
		)
};

export default withStyles(styles)(Video);

////<iframe width="420" height="315" src="https://www.youtube.com/watch?v=kXYiU_JCYtU" frameBorder="0" allowFullScreen></iframe>}