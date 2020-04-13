import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from 'react-redux';

import {consentActions} from '../actions/consent_actions';


function ConsentDialog(props) {
    if (props.consent === true) {
        console.log("hey");
        props.onSuccess();
    }
    return (
    <div>
      <Dialog
        open={props.open}
        onClose={() => props.hideConsentDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.message}</DialogTitle>
        <DialogActions>
          <Button onClick={() => props.hideConsentDialog(false)} color="secondary">
            No
          </Button>
          <Button onClick={() => props.hideConsentDialog(true)} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function mapStateToProps(state) {
    return {
        ...state.consent
    };
}

const actionCreators = {
    showConsentDialog: consentActions.showConsentDialog,
    hideConsentDialog: consentActions.hideConsentDialog
};

export default connect(mapStateToProps, actionCreators)(ConsentDialog);