import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardMedia, CardContent, CardActions } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import red from 'material-ui/colors/red';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Grid from 'material-ui/Grid';
import '../App.css';


class UserMessage extends React.Component {
constructor(){
    super()
    this.state = {avatar: "rgb(212, 0, 116)", username: "Afreen", message: "Hey! I am superb!"}
  }
render() {
    return (
      <div className="bot-message">
        <div style={{backgroundColor: this.state.avatar}} className="bot-avatar"></div>
        <div className='bot-username-message'>
        <div className="username">{this.state.username}</div>
        <div className="message">{this.state.message}</div></div>
      </div>
    )
  }
}

export default UserMessage;