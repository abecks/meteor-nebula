"use strict";

// Create collection
app.collections.Character = new Mongo.Collection("Character", {
  transform: function(document){
    return new app.models.Character(document);
  }
});

// Create schema
app.schema.Character = new SimpleSchema({
  firstname: {
    type: String,
    label: "First Name",
    max: 200
  },
  lastname: {
    type: String,
    label: "Last Name",
    max: 200
  }
});

// Attach schema to collection
app.collections.Character.attachSchema(app.schema.Character);

// An example model
app.models.Character = function(properties){
  // Model properties
  this.firstname = null;
  this.lastname = null;
  this.collection = 'Character';

  // You can define other variables that are not in the schema.
  // Useful for helper variables and functions.
  // todo: make toJSON ignore any values that are not in the schema
  this.someVar = true;

  // Massive assignment
  _.extend(this, properties);
};
app.models.BaseModel.extend(app.models.Character);


// An example of an inherited model
app.models.InheritanceCharacter = function(properties){
  // Model properties
  this.anotherVar = true;

  // Massive assignment
  _.extend(this, properties);
};
app.models.Character.extend( app.models.InheritanceCharacter );



/**
 * Server specific instructions
 */
if(Meteor.isServer){

  // Access rules to restrict database interactions
  app.collections.Character.allow({
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
  Meteor.publish('Characters', function () {
    return app.collections.Character.find();
  });

  // Publish a single item
  Meteor.publish('Character', function (id) {
    return app.collections.Character.find(id);
  });
}
