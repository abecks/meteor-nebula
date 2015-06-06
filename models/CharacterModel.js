"use strict";

// Create collection
app.collections.Character = new Mongo.Collection("Character", {
  transform: function(document){
    return app.models.Character(document);
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
app.models.Character =
  stampit()
    .enclose(function(){
      // Init or constructor function
    })
    .methods({

      // prototype functions
      getName: function(){
        return this.firstname + ' ' + this.lastname;
      }

    });


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
