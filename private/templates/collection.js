"use strict";

// Create collection
app.collections.ModelName = new Meteor.Collection("ModelName", {
  transform: function(document){
    return new app.models.ModelName(document);
  }
});

// Create schema
app.schema.ModelName = new SimpleSchema({

});

// Attach schema to collection
app.collections.ModelName.attachSchema(app.schema.ModelName);

// Model
app.models.ModelName = function(properties){
  // Model properties
  this.collection = 'ModelName';

  // Massive assignment
  _.extend(this, properties);
};
app.models.BaseModel.extend(app.models.ModelName);


/**
 * Server specific instructions
 */
if(Meteor.isServer){

  // Access rules to restrict database interactions
  app.collections.ModelName.allow({
    insert: function(userId, doc){
      return true;
    },
    update: function(userId, server){
      return true;
    },
    remove: function(userId, server){
      return true;
    }
  });

  // Publish the collection
  Meteor.publish('ModelNames', function () {
    return app.collections.ModelName.find();
  });

  // Publish a single item
  Meteor.publish('ModelName', function (id) {
    return app.collections.ModelName.find(id);
  });
}
