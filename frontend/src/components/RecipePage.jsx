import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link, Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import {
    Paper,
    Grid,
    Typography,
    Button,
    Box,
    IconButton
} from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';


import { recipeActions } from '../actions/recipe_actions';
import { consentActions } from '../actions/consent_actions';

const styles = theme => ({
    root: {
        position: 'relative',
        margin: 'auto',
        maxWidth: '90%'
    },
    gridRoot: {
        justifyContent: 'center',
    },
    likeButton: {
        position: 'absolute',
        right: 0,
        top: 0,
    },
    liked: {
        color: 'red'
    },
    notLiked: {

    }
});


class RecipePage extends Component {

    componentDidMount() {
        this.props.getRecipeDetail(this.props.match.params.recipeId);
    }

    handleLike = (like) => {
        const { recipe } = this.props;
        if (like) {
            this.props.like({ recipeId: recipe._id }, recipe);
        } else {
            this.props.unlike({ recipeId: recipe._id }, recipe);
        }
    }

    render() {
        if (this.props.recipes.redirect) {
            return <Redirect to={this.props.recipes.redirect} />
        }
        const { classes, recipe } = this.props;

        const edit = recipe.owner && this.props.profile._id === recipe.owner._id;
        const liked = this.props.likedRecipes.find(o => o._id === recipe._id);

        return (
            <Grid container classes={{ root: classes.gridRoot }}>
                <Grid item xs={12} sm={9} xl={6}>
                    <Paper className={classes.root}>
                        <Typography variant="h3" style={{ padding: '20px' }}>
                            {recipe.name}
                        </Typography>
                        {this.props.profile._id ?
                            <IconButton aria-label="add to favorites" className={classes.likeButton}
                                onClick={() => this.handleLike(!liked)}
                            >
                                <FavoriteIcon className={liked ? classes.liked : classes.notLiked} />
                            </IconButton>
                            :
                            <React.Fragment />
                        }
                        <hr />
                        <Box m={3} />

                        <Typography style={{ textAlign: 'left', padding: '10px' }}>
                            {recipe.shortDesc}
                        </Typography>

                        <Box m={3} />
                        <hr />
                        <Box m={3} />
                        <div>
                            {recipe.photo_url ?
                                <img src={recipe.photo_url} alt={recipe.name} width="30%" style={{ margin: '5px', float: 'left', padding: '0.5rem' }} />
                                :
                                <React.Fragment />}
                            <Typography style={{ overflowWrap: 'break-word', textAlign: 'left', padding: '10px' }}>
                                {recipe.longDesc}
                            </Typography>
                        </div>
                        <Box m={5} style={{ clear: 'both' }} />
                        <hr />
                        <Box m={1} />
                        {edit ?
                            <React.Fragment>
                                <Button variant="contained" component={Link} to={`/edit/${recipe._id}`} style={{ margin: '5px' }}>Edit</Button>
                                <Button variant="contained" color="secondary" style={{ margin: '5px' }} onClick={() => {
                                    this.props.deleteRecipe(recipe._id, "/recipes");
                                }}>Delete</Button>
                            </React.Fragment >
                            :
                            <React.Fragment />
                        }
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
        recipes: state.recipes.recipes,
        recipe: state.recipes.currentRecipe,
        likedRecipes: state.profile.likedRecipes,
        profile: state.auth.user,
    };
}

const actionCreators = {
    getRecipeDetail: recipeActions.getRecipeDetail,
    updateRecipe: recipeActions.updateRecipe,
    deleteRecipe: recipeActions.deleteRecipe,
    like: recipeActions.likeCurrentRecipe,
    unlike: recipeActions.unlikeCurrentRecipe,
    showConsentDialog: consentActions.showConsentDialog,
};

export default withRouter(connect(mapStateToProps, actionCreators)(withStyles(styles)(RecipePage)));