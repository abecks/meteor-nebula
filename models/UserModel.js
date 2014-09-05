/**
* Server specific instructions
*/
if(Meteor.isServer){

  // Deny all interactions from the client
  // todo: update for roles
  Meteor.users.allow({
    insert: function(userId, doc){
      return false;
    },
    update: function(userId, server){
      return false;
    },
    remove: function(userId, server){
      return false;
    }
  });
}