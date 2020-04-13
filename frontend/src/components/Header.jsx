import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { withStyles, Avatar } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    MenuItem,
    MenuList,
    Popper,
    Grow,
    Paper,
    ClickAwayListener,
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle';

import { authActions } from '../actions/auth_actions';
import { snackActions } from '../actions/snackbar_actions';
import { recipeActions } from '../actions/recipe_actions';

const styles = theme => ({
    root: {
        marginBottom: '10px',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        textAlign: 'left',
    },

})

class Header extends Component {

    state = {
        menu: undefined,
        isSignedIn: false,
    }


    componentDidMount() {
    }

    successCallback = googleUser => {
        let profile = googleUser.getBasicProfile();
        let user = {
            name: profile.getName(),
            photo_url: profile.getImageUrl(),
        }
        let tokenId = googleUser.getAuthResponse().id_token;
        this.props.login(user, tokenId, () => {
            this.props.showSnackbar(`Signined in as ${user.name}`);
            this.props.getLikedRecipeList();
        });
    }

    errorCallback = err => {
        console.log(err);
    }

    render() {

        const { classes } = this.props;

        return (
            <AppBar position="static" elevation={1} className={classes.root}>
                <Toolbar variant="dense" position="static">
                    <Typography className={classes.title} variant="h6" color="inherit" component={Link} to='/'>
                        Yummy recipes
                    </Typography>
                    {!this.props.auth.loggedIn ?
                        <GoogleLogin
                            clientId="519594520395-kk3c91nsf94s0kb47j4kgocj8s2104nl.apps.googleusercontent.com"
                            render={renderProps => (
                                <Button color="inherit" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login</Button>
                            )}
                            buttonText="Login"
                            onSuccess={this.successCallback}
                            onFailure={this.errorCallback}
                            cookiePolicy={'single_host_origin'}
                        />
                        :
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={e => this.setState({ menu: e.currentTarget })}
                                color="inherit"
                            >
                                {this.props.auth.user.photo_url ? <Avatar src={this.props.auth.user.photo_url} /> : <AccountCircle />}

                            </IconButton>
                            <Popper open={Boolean(this.state.menu)}
                                role={undefined} 
                                transition 
                                disablePortal
                                anchorEl={this.state.menu}
                                >
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={() => { this.setState({ menu: null }) }}>
                                                <MenuList id="menu-list-grow">
                                                    <MenuItem onClick={() => { this.setState({ menu: null }); }} component={Link} to="/profile">Profile</MenuItem>
                                                    <MenuItem onClick={() => { this.props.logout(); this.setState({ menu: null }); }}>Logout</MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </div>
                    }
                </Toolbar>
            </AppBar>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

const actionCreators = {
    login: authActions.login,
    logout: authActions.logout,
    getLikedRecipeList: recipeActions.getLikedRecipeList,
    showSnackbar: snackActions.showSnackbar,
};

export default withRouter(connect(mapStateToProps, actionCreators)(withStyles(styles)(Header)));