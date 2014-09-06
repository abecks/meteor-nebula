Router.map(function () {

  // Index
  this.route('characterIndex', {
    path: '/characters',
    title: 'Characters Collection',
    waitOn: function () {
      return Meteor.subscribe('Characters');
    },
    data: function () {
      return app.collections.Character.find();
    }
  });

  // Create
  this.route('characterCreate', {
    path: '/characters/create',
    title: 'Add New Character'
  });

  // Update
  this.route('characterUpdate', {
    path: '/characters/edit/:_id',
    title: 'Edit Character',
    waitOn: function () {
      return Meteor.subscribe('Character', this.params._id);
    },
    data: function () {
      return app.collections.Character.findOne(this.params._id);
    }
  });

  // View
  this.route('characterView', {
    path: '/characters/:_id',
    title: 'View Character',
    waitOn: function () {
      return Meteor.subscribe('Character', this.params._id);
    },
    data: function () {
      return app.collections.Character.findOne(this.params._id);
    }
  });

});