import React from 'react';
import './App.css';
import ChatBotMessage from './components/chatbotmessage';
import UserMessage from './components/usermessage';
import Grid from 'material-ui/Grid';
import Input from './components/footerinput';
import { withStyles } from 'material-ui/styles'
import ColoredScrollbars from './components/coloredcsrollbar';

const styles=theme=>({
  grid1: {
    flexBasis: "90%",
    overflow: 'auto',
    //backgroundColor: 'white'
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
   // border: '4px solid grey',
   borderRadius: '20px',
   //background: '#38394D',
   //background: "url('images/neon.jpeg')",
   //backgroundSize: 'cover',
   //backgroundReapeat: 'no-repeat'
    //filter: 'opacity(90%)'
   
  },
});

class Chat extends React.Component {
constructor(props){
    super(props)
    this.state = {
      chatHistory: [
        {message: '',type: '', mtype: ''}
      ]
    }
    this.handleSubmit=this.handleSubmit.bind(this);
  }
//fetching bot's greeting message
/*componentWillMount() {
  fetch('https://my-json-server.typicode.com/afreen23/fakeapi2/db')
  .then(results => results.json())
  .then( data => {
    let mes=data.output.text[0]
    this.setState({chatHistory: [
        {
          type: 'bot',
          message: mes,
          mtype: 'text'
        }  
      ]});
  })
} */
//rendering and sending user input
handleSubmit(e) {
  var obj= { type: 'user', message: e}
  this.setState({chatHistory: this.state.chatHistory.concat(obj)});
   
   function status(response) {
   if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
      } else {
        return Promise.reject(new Error(response.statusText))
      }
    }

    function json(response) {
      return response.json()
    }

   //for sending reply
   fetch('https://app.bullring34.hasura-app.io/input', {
    method: 'POST',
    body: JSON.stringify({
      input: e
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(json)
  .then(function(data) {
    console.log(data);
  })

  .catch(function(error) {
    console.log('Fetch Error :-S', error);
  });

 //for getting reply
  fetch('https://my-json-server.typicode.com/afreen23/fakeapi2/db')
  .then(status)
  .then(json)
  .then( data => {
      let ms = data.output.text[1]
      let typeOfmes= data.output.type[1]
      let obj= { type: 'bot', message: ms, mtype: 'text'}

      this.setState({chatHistory: this.state.chatHistory.concat(obj)});
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
       <ColoredScrollbars>
        {this.state.chatHistory.map((chats,index) => 
          chats.type==='user'? 
          <UserMessage key={index}  message={chats.message}/> : 
          <ChatBotMessage mtype={chats.mtype} message={chats.message} key={index}/> )}
       </ColoredScrollbars>
       </Grid>
       <Grid item xs={12} className={classes.grid2}>
        <Input onSubmit={this.handleSubmit}/>
      </Grid> 
    </Grid>
    );
  }
}

export default withStyles(styles)(Chat);


/*
 background: "-moz-linear-gradient(45deg, rgba(0,0,128,1) 0%, rgba(0,128,128,1) 93%, rgba(0,128,128,1) 100%)", /* ff3.6+ 
background: "-webkit-gradient(linear, left bottom, right top, color-stop(0%, rgba(0,0,128,1)), color-stop(93%, rgba(0,128,128,1)), color-stop(100%, rgba(0,128,128,1)))", /* safari4+,chrome 
background: "-webkit-linear-gradient(45deg, rgba(0,0,128,1) 0%, rgba(0,128,128,1) 93%, rgba(0,128,128,1) 100%)", /* safari5.1+,chrome10+ 
background: "-o-linear-gradient(45deg, rgba(0,0,128,1) 0%, rgba(0,128,128,1) 93%, rgba(0,128,128,1) 100%)", /* opera 11.10+ 
background: "-ms-linear-gradient(45deg, rgba(0,0,128,1) 0%, rgba(0,128,128,1) 93%, rgba(0,128,128,1) 100%)", /* ie10+ 
background: "linear-gradient(45deg, rgba(0,0,128,1) 0%, rgba(0,128,128,1) 93%, rgba(0,128,128,1) 100%)", /* w3c 
filter: "progid:DXImageTransform.Microsoft.gradient( startColorstr='#008080', endColorstr='#000080',GradientType=1 )" 
*/