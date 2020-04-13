import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { snackActions } from '../actions/snackbar_actions';


function MySnackbar(props) {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={props.open}
            autoHideDuration={3000}
            onClose={props.hideSnackbar}
            message={props.message}
            action={
                <React.Fragment>
                  <IconButton size="small" aria-label="close" color="inherit" onClick={props.hideSnackbar}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
        />
    );
}

function mapStateToProps(state) {
    return {
        ...state.snackbar,
    };
}

const actionCreators = {
    showSnackbar: snackActions.showSnackbar,
    hideSnackbar: snackActions.hideSnackbar
};

export default connect(mapStateToProps, actionCreators)(MySnackbar);