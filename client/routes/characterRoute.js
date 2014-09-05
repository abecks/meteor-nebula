Router.map(function() {
  this.route('characters', {
    path: '/characters',
    title: 'Characters Collection',
    waitOn: function(){
      return Meteor.subscribe('Character');
    },
    data: function(){
      return app.collections.Character.find();
    }
  });
});

Router.map(function() {
  this.route('createCharacter', {
    path: '/characters/create',
    title: 'Add New Character'
  });
});