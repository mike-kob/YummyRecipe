import { recipeConstants } from '../utils/constants';

export const consentActions = {
    showConsentDialog,
    hideConsentDialog
};

function showConsentDialog(message, onSuccess) {
    return { type: recipeConstants.SHOW_CONSENT_DIALOG, data: { message: message, onSuccess: onSuccess } };
}

function hideConsentDialog(consent) {
    return { type: recipeConstants.HIDE_CONSENT_DIALOG, data: consent };
}
