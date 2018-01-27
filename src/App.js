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
constructor(){
    super()
    this.state = {
      chatHistory: [
        {message: '',type: ''}
      ]
    }
    this.handleSubmit=this.handleSubmit.bind(this);
  }
//fetching bot's greeting message
componentWillMount() {
  fetch('https://my-json-server.typicode.com/afreen23/fakeapi2/db')
  .then(results => results.json())
  .then( data => {
    let mes=data.output.text[0]
    this.setState({chatHistory: [
        {
          type: 'bot',
          message: mes
        }  
      ]});
  })
} 
//rendering and sending user input
handleSubmit(e) {
  var obj= { type: 'user', message: e}
  this.setState({chatHistory: this.state.chatHistory.concat(obj)});
  fetch('https://my-json-server.typicode.com/afreen23/fakeapi2/db', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstParam: 'yourValue',
    secondParam: 'yourOtherValue',
  }),
}).then(results => results.json())
  .then( data => {
      console.log(data);
      let ms = data.output.text[1]
      this.setState({chatHistory: [
        {
          type: 'bot',
          message: ms
        }  
      ]});
    })
  .catch((error) => {
        console.error(error);
    });
}
  render() {
    const {classes}= this.props;
    return (
     <Grid container className={classes.container} direction='column' justify='space-between'>
       <Grid item xs={12} style={{padding: '20px 0px 0px 20px'}} className={classes.grid1}>
        {this.state.chatHistory.map((chats,index) => chats.type==='user'? <UserMessage key={index} message={chats.message}/> : <ChatBotMessage message={chats.message} key={index}/> )}
       </Grid>
       <Grid item xs={12} className={classes.grid2}>
        <Input onSubmit={this.handleSubmit}/>
      </Grid> 
    </Grid>
    );
  }
}

export default withStyles(styles)(Chat);
