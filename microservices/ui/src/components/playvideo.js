import React from 'react';
import {withStyles} from 'material-ui/styles';

const styles= theme => ({
	root:{marginTop: "10px"}
});

const Video = (props) => {
	const {classes} =props;
	return (
			<div className={classes.root}>
				<iframe title="video song" width="900" height="400" src="https://www.youtube.com/embed/tgbNymZ7vqY">
				</iframe>
			</div>
		)
};

export default withStyles(styles)(Video);