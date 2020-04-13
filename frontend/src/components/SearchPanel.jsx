import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import {
    InputLabel,
    TextField,
    Menu,
    MenuItem,
    FormControl,
    Select,
    InputAdornment,
    IconButton,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import SortIcon from '@material-ui/icons/Sort';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import { recipeActions } from '../actions/recipe_actions';
import {sorting} from '../utils/constants';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles(theme => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);


function SearchPanel(props) {
    const classes = useStyles();
    const { filterCategory, filterTerm, categories } = props;

    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);

    React.useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);

    return (
        <div className={classes.root}>
            <FormControl variant="outlined" className={classes.formControl}>
                <TextField
                    label=""
                    variant="outlined"
                    placeholder="Search..."
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                    InputLabelProps={{
                        shrink: false,
                    }}

                    onChange={e => props.filterRecipeList(e.target.value, filterCategory)}
                />
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={inputLabel} id="select-outlined-label">
                    Category
                </InputLabel>
                <Select
                    labelId="select-outlined-label"
                    value={filterCategory}
                    onChange={e => props.filterRecipeList(filterTerm, e.target.value)}
                    labelWidth={labelWidth}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {categories.map(category => (
                        <MenuItem key={category} value={category}>{category}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <div>
                <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
                    <SortIcon style={{ float: 'right' }} />
                </IconButton>

                <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={e => setAnchorEl(null)}
                    value="1"
                >
                    <StyledMenuItem value="1" 
                        onClick={() => props.selectSorting(sorting.DATE_DESCENDING)}
                        selected={sorting.DATE_DESCENDING === props.sorting }
                    >
                        <ListItemIcon>
                            <ArrowUpwardIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="By date descending " />
                    </StyledMenuItem>
                    <StyledMenuItem value="2" 
                        onClick={() => props.selectSorting(sorting.DATE_ASCENDING)}
                        selected={sorting.DATE_ASCENDING === props.sorting }
                    >
                        <ListItemIcon>
                            <ArrowDownwardIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="By date ascending" />
                    </StyledMenuItem>
                </StyledMenu>
            </div>
        </div >
    );
}


function mapStateToProps(state) {
    return {
        filterTerm: state.recipes.filterTerm,
        filterCategory: state.recipes.filterCategory,
        categories: state.recipes.categories,
        sorting: state.recipes.sorting,
    };
}

const actionCreators = {
    filterRecipeList: recipeActions.filterRecipeList,
    selectSorting: recipeActions.selectSorting,
};

export default connect(mapStateToProps, actionCreators)(SearchPanel);