// Determine whether the user is currently logged in.
Template.registerHelper('loggedIn', function(){
  return Meteor.user() !== null;
});