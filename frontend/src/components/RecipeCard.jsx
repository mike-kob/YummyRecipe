import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import {
    Card,
    CardHeader,
    CardActions,
    CardMedia,
    CardContent,
    CardActionArea,
    Avatar,
    IconButton,
    Typography,
} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { red } from '@material-ui/core/colors';

import { recipeActions } from '../actions/recipe_actions';
import { consentActions } from '../actions/consent_actions';

const styles = theme => ({
    root: {
        maxWidth: 345,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    actionsRoot: {
        alignSelf: 'flex-end',
        marginTop: 'auto',
    },
    actionsRootRight: {
        alignSelf: 'flex-start',
        marginTop: 'auto',
    },
    actionAreaRoot: {
    },
    liked: {
        color: 'red'
    },
    notLiked: {

    }
});

const SHORT_DESC_LIMIT = 200;

class RecipeCard extends Component {

    render() {
        const { recipe, classes } = this.props;
        const liked = this.props.likedRecipes.find(o => o._id === recipe._id);
        const created = new Date(recipe.createDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', year: 'numeric' });
        const edit = this.props.profile._id === recipe.owner._id;

        return (
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar} src={recipe.owner ? recipe.owner.photo_url : ''}>
                            A
                        </Avatar>
                    }
                    title={recipe.name}
                    subheader={created}
                />
                <CardActionArea classes={{ root: classes.actionAreaRoot }} component={Link} to={{
                    pathname: `/recipes/${recipe._id}`,
                    state: {
                        recipe: recipe
                    }
                }}>
                    <CardMedia
                        className={classes.media}
                        image={recipe.photo_url}
                        title="Paella dish"
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {recipe.shortDesc.length >= SHORT_DESC_LIMIT ? recipe.shortDesc.substr(0, SHORT_DESC_LIMIT) + '...' : recipe.shortDesc}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions disableSpacing classes={{ root: classes.actionsRoot }}>
                    {edit ?
                        <React.Fragment>
                            <IconButton aria-label="edit" component={Link} to={`/edit/${recipe._id}`}>
                                <EditIcon />
                            </IconButton>
                            <IconButton aria-label="delete" onClick={() => this.props.showConsentDialog(
                                `Do you really want to delete ${recipe.name}?`,
                                () => this.props.deleteRecipe(recipe._id)
                            )}>
                                <DeleteIcon />
                            </IconButton>
                        </React.Fragment>
                        :
                        <React.Fragment />
                    }
                    {this.props.profile._id ?
                        <IconButton aria-label="add to favorites"
                            onClick={() => liked ?
                                this.props.unlike({ recipeId: recipe._id }, recipe) :
                                this.props.like({ recipeId: recipe._id }, recipe)}
                        >
                            <FavoriteIcon className={liked ? classes.liked : classes.notLiked} />
                        </IconButton>
                        :
                        <React.Fragment />
                    }
                </CardActions>
            </Card >
        )
    }
}

function mapStateToProps(state) {
    return {
        recipes: state.recipes.recipes,
        likedRecipes: state.profile.likedRecipes,
        profile: state.auth.user,
    };
}

const actionCreators = {
    getRecipeList: recipeActions.getRecipeList,
    like: recipeActions.likeRecipe,
    unlike: recipeActions.unlikeRecipe,
    deleteRecipe: recipeActions.deleteRecipe,
    showConsentDialog: consentActions.showConsentDialog,
};

export default withRouter(connect(mapStateToProps, actionCreators)(withStyles(styles)(RecipeCard)));