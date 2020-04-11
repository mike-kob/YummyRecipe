import { combineReducers } from 'redux';

import { recipes } from './recipe_reducer';
import { consent } from './consent_reducer';
import { snackbar } from './snackbar_reducer';
import { auth } from './auth_reducer';
import { profile } from './profile_reducer';

const rootReducer = combineReducers({
    recipes,
    consent,
    snackbar,
    auth,
    profile,
});

export default rootReducer;