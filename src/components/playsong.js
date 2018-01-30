import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import SkipPreviousIcon from 'material-ui-icons/SkipPrevious';
import PlayArrowIcon from 'material-ui-icons/PlayArrow';
import SkipNextIcon from 'material-ui-icons/SkipNext';

const styles = theme => ({
  root: {
    marginTop: 10,
    width: 370
  },
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 370,
    height: 179,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});

function Play(props) {
  const { classes, theme } = props;

  return (
    <div className={classes.root}>
      <Card className={classes.card} elevation={10} style={{background: "url('images/thunder.jpeg')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography type="headline" style={{color: 'white'}}>Live From Space</Typography>
            <Typography type="subheading" style={{color: 'grey'}}>
              G-Eazy Featuring A$AP Rocky & Cardi B
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton aria-label="Previous">
              {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
            </IconButton>
            <IconButton aria-label="Play/pause">
              <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
            <IconButton aria-label="Next">
              {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
            </IconButton>
          </div>
        </div>
       
      </Card>
    </div>
  );
}

Play.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Play);
/*
 <CardMedia
          className={classes.cover}
          image="images/thunder.jpeg"
          title="Live from space album cover"
        />
*/