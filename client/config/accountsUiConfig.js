Accounts.ui.config({

  // Which permissions to request for each external service
  requestPermissions: {
    facebook: ['user_likes'],
    github: ['user', 'repo']
  },

  // To ask the user for permission to act on their behalf when
  // offline, map the relevant external service to true.
  // Currently only supported with Google.
  requestOfflineToken: {
    google: true
  },

  // Forces the user to approve the app's permissions, even
  // if previously approved. Currently only supported with Google.
  forceApprovalPrompt: false,

  // Which fields to display in the user creation form.
  // One of 'USERNAME_AND_EMAIL', 'USERNAME_AND_OPTIONAL_EMAIL',
  // 'USERNAME_ONLY', or 'EMAIL_ONLY' (default)
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'

});