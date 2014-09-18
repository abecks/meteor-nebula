Router.map(function () {

  // Index
  this.route('modelNameIndex', {
    path: '/modelName',
    title: 'upperModelNames Collection',
    waitOn: function () {
      return Meteor.subscribe('upperModelNames');
    },
    data: function () {
      return app.collections.upperModelName.find();
    }
  });

  // Create
  this.route('modelNameCreate', {
    path: '/modelName/create',
    title: 'Add New upperModelName'
  });

  // Update
  this.route('modelNameUpdate', {
    path: '/modelName/edit/:_id',
    title: 'Edit upperModelName',
    waitOn: function () {
      return Meteor.subscribe('upperModelName', this.params._id);
    },
    data: function () {
      return app.collections.upperModelName.findOne(this.params._id);
    }
  });

  // View
  this.route('modelNameView', {
    path: '/modelName/:_id',
    title: 'View upperModelName',
    waitOn: function () {
      return Meteor.subscribe('upperModelName', this.params._id);
    },
    data: function () {
      return app.collections.upperModelName.findOne(this.params._id);
    }
  });

});