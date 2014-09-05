Meteor.startup(function(){
  // Create default user
  if ( Meteor.users.find().count() === 0 ) {
    Accounts.createUser({
      username: 'admin',
      password: 'admin'
    });
  }
})