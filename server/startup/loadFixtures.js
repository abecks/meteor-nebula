// Inspired by matteodem's meteor-boilerplate:
// https://github.com/matteodem/meteor-boilerplate/

// todo: this should either be performed on a testing database
// or have a way to save and restore the original database
function loadFixture(data, collection) {
  // Empty the collection first
  collection.remove({});

  _.each(data, function(document){
    collection.insert(document);
  });
}

// Load each fixture into the database
function loadFixtures(){
  _.each(app.fixtures, function(fixture){
    var collection = app.collections[fixture.collection];
    if(!collection){
      throw new Error('Invalid collection "' + fixture.collection + '" in fixture.');
    }

    // Only load the fixture if the collection is empty
    if(collection.find().count() === 0){
      loadFixture(fixture.data, collection);
    }
  });
}

Meteor.startup(function () {
  loadFixtures();
});