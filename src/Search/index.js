import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
  },
  appBarRoot: {
      backgroundColor: '#F08700'
  },
  title: {
    display: 'none',
    marginRight: "15px",
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    marginRight: "15px",
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
    },
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  buttonRoot: {
      borderRadius: "10px",
      color: "white",
  }
});

const Search = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar classes={{root: classes.appBarRoot}} position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" color="inherit" noWrap>
            Location
          </Typography>
          <div className={classes.search}>
            <InputBase
              placeholder="City Location"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              name="location"
              onChange={props.handleChange.bind(null)}
              value={props.newValue}
            />
          </div>
          <IconButton classes={{root: classes.buttonRoot}} onClick={props.handleClick}>Search</IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);