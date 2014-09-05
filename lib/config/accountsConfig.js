Accounts.config({

  // New users with an email address will receive an address verification email.
  sendVerificationEmail: false,

  // Calls to createUser from the client will be rejected. In addition,
  // if you are using accounts-ui, the "Create account" link will not be available.
  forbidClientAccountCreation: false,

  // If set to a string, only allows new users if the domain part of their email
  // address matches the string. Check the Meteor documentation for more info.
  restrictCreationByEmailDomain: false,

  // The number of days from when a user logs in until their token expires and
  // they are logged out. Defaults to 90. Set to null to disable login expiration.
  loginExpirationInDays: 90

})