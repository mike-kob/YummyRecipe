import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core'
import {
    Grid,
} from '@material-ui/core'

import { recipeActions } from '../actions/recipe_actions';
import RecipeCard from './RecipeCard';
import SearchPanel from './SearchPanel';
import { sorting } from '../utils/constants'


const styles = theme => ({
    root: {
        display: 'flex',
        margin: 'auto'
    },
    page: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    search: {
    },
    margin: {
        position: 'fixed',
        bottom: theme.spacing(4),
        right: theme.spacing(2),
    }
})

class Recipes extends Component {

    componentDidMount() {
        this.props.getRecipeList();
        this.props.getCategoryList();
        if (this.props.loggedIn) {
            this.props.getLikedRecipeList();
        }
    }

    renderRecipes = (recipes) => {
        return recipes.map(recipe => (
            <Grid key={recipe._id} item xs={12} md={6} lg={3} xl={2}>
                <RecipeCard key={recipe._id} recipe={recipe} />
            </Grid>
        ))
    }

    getSort = s => {
        switch (s) {
            case sorting.DATE_DESCENDING:
                return (a, b) => new Date(b.createDate) - new Date(a.createDate);

            case sorting.DATE_ASCENDING:
                return (a, b) => new Date(a.createDate) - new Date(b.createDate);

            default:
                return (a, b) => new Date(b.createDate) - new Date(a.createDate);
        }
    }

    render() {
        const { classes, recipes, filterTerm, filterCategory } = this.props;

        return (
            <Grid container spacing={3} className={classes.page}>
                <Grid item className={classes.search}>
                    <SearchPanel />
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={3} classes={{ root: classes.root }}>
                        {this.renderRecipes(
                            recipes.sort(this.getSort(this.props.sorting))
                                .filter(recipe => (
                                    recipe.shortDesc.includes(filterTerm) ||
                                    recipe.longDesc.includes(filterTerm) ||
                                    recipe.name.includes(filterTerm) ||
                                    recipe.category.includes(filterTerm)
                                )).filter(recipe => (
                                    filterCategory === "" ||
                                    recipe.category.includes(filterCategory)
                                ))
                        )}
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

function mapStateToProps(state) {
    return {
        recipes: state.recipes.recipes,
        filterTerm: state.recipes.filterTerm,
        filterCategory: state.recipes.filterCategory,
        sorting: state.recipes.sorting,
        loggedIn: state.auth.loggedIn,
    };
}

const actionCreators = {
    filterRecipeList: recipeActions.filterRecipeList,
    getRecipeList: recipeActions.getRecipeList,
    getLikedRecipeList: recipeActions.getLikedRecipeList,
    getCategoryList: recipeActions.getCategoryList,
};

export default withRouter(connect(mapStateToProps, actionCreators)(withStyles(styles)(Recipes)));