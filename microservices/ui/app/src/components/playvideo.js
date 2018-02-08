import React from 'react';
import {withStyles} from 'material-ui/styles';

const styles= theme => ({
	root:{marginTop: "10px"}
});

const Video = (props) => {
	const {classes , src} =props;
	const urlParts = src.split("v=");
	const id = urlParts[1];
	const newurl = `http://www.youtube.com/embed/${id}`
	return (
			<div className={classes.root}>
				<iframe type="text/html" 
    width="640" 
    height="385" 
    src={newurl}
    frameBorder="0"
    allowFullScreen
    >
</iframe>
			</div>
		)
};

export default withStyles(styles)(Video);

////<iframe width="420" height="315" src="https://www.youtube.com/watch?v=kXYiU_JCYtU" frameBorder="0" allowFullScreen></iframe>}