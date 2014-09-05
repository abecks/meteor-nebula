// Determine whether the user is currently logged in.
UI.registerHelper('loggedIn', function(){
  return Meteor.user() !== null;
});