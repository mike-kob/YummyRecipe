import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import Recipe from './Recipe';
import { recipeActions } from '../actions/recipe_actions';

const styles = theme => ({
    root: {
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
});

class AddRecipe extends Component {

    state = {
        toRecipes: false
    }

    onSave = () => {
        this.props.addRecipe(this.props.recipe)
        this.setState({ toRecipes: true });
    }

    onCancel = () => {
        this.setState({ toRecipes: true });
    }

    componentDidMount() {
        this.props.editCurrentRecipe({
            "name": "",
            "category": [],
            "photo_url": "",
            "shortDesc": "",
            "longDesc": "",
            "createDate": ""
        })
    }

    render() {
        if (this.state.toRecipes) {
            return <Redirect to='/profile/recipes' />;
        }
        const { classes } = this.props;

        return (
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Recipe title="Add a new recipe" />

                    <div className={classes.buttons}>
                        <Button className={classes.button}
                            onClick={this.onCancel}>
                            Cancel</Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={this.onSave}
                        >
                            Save
                </Button>
                    </div>
                </Paper>
            </main>
        )
    }
}

function mapStateToProps(state) {
    return {
        recipe: state.profile.currentRecipe
    };
}

const actionCreators = {
    editCurrentRecipe: recipeActions.editCurrentRecipe,
    addRecipe: recipeActions.addRecipe,
};

export default withRouter(connect(mapStateToProps, actionCreators)(withStyles(styles)(AddRecipe)));