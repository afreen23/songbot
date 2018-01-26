import React from 'react';
import './App.css';
import ChatBotMessage from './components/chatbotmessage';
import UserMessage from './components/usermessage';
import Grid from 'material-ui/Grid';
import Input from './components/footerinput';
import { withStyles } from 'material-ui/styles'

const styles=theme=>({
  grid1: {
    flexBasis: "90%",
    overflow: 'auto',
    //padding: '20px 20px 0px 0px',
    //border:"1px solid white"
  },
  grid2: {
    flexBasis: "10%",
    //border:"1px solid white"
  },
  grid3: {
    width: '100%',
    height: '100%'
  },
  grid4: {

  },
  container: {
   height: '660px',
   width: '1290px',
   margin: '8px 40px 0px 40px',
   border: '4px solid white',
   borderRadius: '20px'
  },
});

class Chat extends React.Component {
  render() {
    const {classes}= this.props;
    return (
     <Grid container className={classes.container} direction='column' justify='space-between'>
       <Grid item xs={12} style={{padding: '20px 0px 0px 20px'}} className={classes.grid1}>
        <ChatBotMessage/>
        <UserMessage/>
       </Grid>
       <Grid item xs={12} className={classes.grid2}>
        <Input/>
      </Grid> 
    </Grid>
    );
  }
}

export default withStyles(styles)(Chat);
