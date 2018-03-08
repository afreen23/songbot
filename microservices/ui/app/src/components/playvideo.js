import React from 'react';
import {withStyles} from 'material-ui/styles';

const styles= theme => ({
	root:{
		marginTop: "10px",
		width: '100%',
		filter:'drop-shadow(8px 8px 10px #232222)'
	}
});

const Video = (props) => {
	const {classes , src} =props;
	return (
			<div className={classes.root}>
				<iframe 
					title="youtube video player"
				    width="100%" 
				    height="385" 
				    src={src}
				    frameBorder="0"
				    allowFullScreen
				    >
				</iframe>
			</div>
		)
};

export default withStyles(styles)(Video);
