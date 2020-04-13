import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import {
    Grid,
    TextField,
    FormControl,
    InputLabel,
    Select,
    Input,
    Chip,
    MenuItem,
    withStyles,
} from '@material-ui/core';
import { recipeActions } from '../actions/recipe_actions';

const styles = theme => ({
    photo: {
        maxWidth: '100px'
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: 2,
    },
});


class Recipe extends Component {

    componentDidMount() {
        this.props.getCategoryList();
    }

    render() {
        const { recipe, categories, classes } = this.props;
        const props = this.props;

        return (
            <React.Fragment>

                <Typography component="h1" variant="h4" align="center">
                    {props.title}
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} >
                        <TextField required
                            autoFocus
                            label="Name"
                            fullWidth
                            value={recipe.name}
                            onChange={e => props.editCurrentRecipe({ name: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel id="demo-mutiple-chip-label">Category</InputLabel>
                            <Select
                                labelId="demo-mutiple-chip-label"
                                id="demo-mutiple-chip"
                                multiple
                                value={recipe.category}
                                onChange={e => props.editCurrentRecipe({ category: e.target.value })}
                                input={<Input id="select-multiple-chip" />}
                                renderValue={selected => (
                                    <div className={classes.chips}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} className={classes.chip} />
                                        ))}
                                    </div>
                                )}
                            >
                                {categories.map(cat => (
                                    <MenuItem key={cat} value={cat}>
                                        {cat}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} >
                        <TextField required
                            label="Short description"
                            fullWidth
                            multiline
                            rows="2"
                            value={recipe.shortDesc}
                            onChange={e => props.editCurrentRecipe({ shortDesc: e.target.value })}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            required
                            fullWidth
                            label="Long description"
                            multiline
                            rows="10"
                            value={recipe.longDesc}
                            onChange={e => props.editCurrentRecipe({ longDesc: e.target.value })}

                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField label="Photo url"
                            fullWidth
                            value={recipe.photo_url}
                            onChange={e => props.editCurrentRecipe({ photo_url: e.target.value })}
                        />
                    </Grid>
                    {recipe.photo_url ?
                        <Grid item xs={12} >
                            <img src={recipe.photo_url} className={classes.photo} alt="Recipe" />
                        </Grid> : <div />
                    }
                </Grid>

            </React.Fragment>
        );
    }
}



function mapStateToProps(state) {
    return {
        recipe: state.profile.currentRecipe,
        likedRecipes: state.profile.likedRecipes,
        categories: state.recipes.categories
    };
}

const actionCreators = {
    editCurrentRecipe: recipeActions.editCurrentRecipe,
    getCategoryList: recipeActions.getCategoryList,
};

export default withStyles(styles)(connect(mapStateToProps, actionCreators)(Recipe));