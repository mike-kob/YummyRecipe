import React, { Component } from "react";
import {
    Paper,
    Tabs,
    Tab,
    Grid,
    Fab,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
} from '@material-ui/core'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { recipeActions } from '../actions/recipe_actions';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

import RecipeCard from './RecipeCard';

const styles = theme => ({
    root: {
        width: '65%',
        margin: '0 auto',
    },
    main: {
        width: '65%',
        margin: 'auto',
        marginTop: theme.spacing(4),
    },
    margin: {
        position: 'fixed',
        bottom: theme.spacing(12),
        right: theme.spacing(2),
    },
    recipeList: {
        margin: theme.spacing(2),

    }
});

class ProfileRecipes extends Component {

    state = {
        current: "recipes"
    }

    componentDidMount() {
        this.props.getProfileRecipeList();
        this.props.getLikedRecipeList();
    }

    renderRecipes = (recipes) => {
        return recipes.map(recipe => (
            <Grid key={recipe._id} item xs={12} md={6} lg={6} xl={6}>
                <RecipeCard key={recipe._id} recipe={recipe} edit={true} />
            </Grid>
        ));
    }

    renderMyRecipes = () => {
        const { classes, recipes } = this.props;

        return (
                <Grid item xs={12} className={classes.main}>
                    <Grid container spacing={3} classes={{ root: classes.root }}>
                        {this.renderRecipes(recipes)}
                    </Grid>
                </Grid>

        )
    }

    renderFavItem = (recipe) => {
        const { classes } = this.props;

        return (
            <Paper key={recipe._id} className={classes.recipeList} >
                <ListItem alignItems="flex-start" component={Link} to={{
                    pathname: `/recipes/${recipe._id}`,
                    state: {
                        recipe: recipe
                    }
                }}>
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={recipe.owner ? recipe.owner.photo_url : ''} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={recipe.name}
                        secondary={
                            <React.Fragment>
                                {recipe.shortDesc}
                            </React.Fragment>
                        }
                    />
                </ListItem>
            </Paper>

        )
    }

    renderFavourite = () => {
        const { classes, likedRecipes } = this.props;

        return (
            <List className={classes.root}>
                {likedRecipes.map(this.renderFavItem)}
            </List>
        );
    }

    renderContent = current => {
        switch (current) {
            case "recipes":
                return this.renderMyRecipes();

            case "liked":
                return this.renderFavourite();

            default:
                return <div></div>
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Paper className={classes.root}>
                    <Tabs
                        value={this.state.current}
                        onChange={(e, val) => this.setState({ current: val })}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="My recipes" value="recipes" />
                        <Tab label="Favourite recipes" value="liked" />
                    </Tabs>
                </Paper>

                {this.renderContent(this.state.current)}

                <Fab color="secondary" aria-label="add" className={classes.margin} component={Link} to="/add">
                    <AddIcon />
                </Fab>
            </React.Fragment>
        )
    }
}



function mapStateToProps(state) {
    return {
        recipes: state.profile.profileRecipes,
        likedRecipes: state.profile.likedRecipes,
    };
}

const actionCreators = {
    getProfileRecipeList: recipeActions.getProfileRecipeList,
    getLikedRecipeList: recipeActions.getLikedRecipeList,
};

export default withStyles(styles)(connect(mapStateToProps, actionCreators)(ProfileRecipes));