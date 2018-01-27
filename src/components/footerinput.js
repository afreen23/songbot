import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';
import purple from 'material-ui/colors/purple';

const styles = theme => ({
  inputLabelFocused: {
    color: purple[500],
  },
  inputInkbar: {
    '&:after': {
      backgroundColor: purple[500],
    },
  },
  textFieldRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  textFieldInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  textFieldFormLabel: {
    fontSize: 18,
  },
});

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state={value: ''}
    this.handleKeyPress=this.handleKeyPress.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }
  
  handleChange(e) {
    this.setState({value: e.target.value});
  }

  handleKeyPress(e) {
    if(e.key === 'Enter'||e.which === 13) {
      this.props.onSubmit(e.target.value);
      this.setState({value: ''});
    }
 console.log(this.state.response);
  }

  render() {
  const { classes } = this.props;

  return (

      <TextField
        fullWidth
        placeholder="Type here ......."
        InputProps={{
          disableUnderline: true,
          classes: {
            root: classes.textFieldRoot,
            input: classes.textFieldInput,
          },
        }}
        value={this.state.value}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
      />

  );
 }
}

Input.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Input);


