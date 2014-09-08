/*
Base model for our simple model structure
*/
"use strict";

app.models.BaseModel = function() {};

app.models.BaseModel.prototype = {

  // Track changes for efficient saving
  _changed: [],

  // The collection where the model is saved
  collection: null,

  // Sets a property within the object with (key, value) or multiple
  // properties with ({ key: value })
  // Tracks property changes at the root level
  // todo: track changes at a deeper level to prevent redundant saves?
  set: function (key, value) {
    var attrs, attr;

    // Handle both `"key", value` and `{key: value}` -style arguments.
    if (typeof key === 'object') {
      attrs = key;
    } else {
      (attrs = {})[key] = value;
    }

    for(attr in attrs){
      this[ attr ] = attrs[attr];

      if(! _.contains(this._changed, attr)) {
        this._changed.push(attr);
      }
    }
  },

  // Convert the object to JSON format
  // Excludes properties present in the BaseModel
  toJSON: function () {
    var json = {};

    // Serialize all properties and inherited properties that are not
    // present in the BaseModel or the Object prototype
    for(var attr in this) {
      if(! app.models.BaseModel.prototype.hasOwnProperty(attr)
        && ! Object.prototype.hasOwnProperty(attr)
        && typeof this[attr] !== 'function'
      ) {
        json[ attr ] = this[ attr ];
      }
    }

    return json;
  },

  // Save the specified JSON into the model's collection
  // Not for public use.
  _save: function (json, keepChanged) {
    if(! keepChanged) {
      this._changed = [];
    }

    var collection = app.collections[this.collection];
    if(! collection) {
      throw new Error('Invalid collection "' + this.collection + '" in model ' + typeof(this));
    }

    delete json._id;
    if(this._id === null) {
      this._id = collection.insert(json);
    } else {
      collection.update({ _id: this._id }, { $set: json });
    }
  },

  // Save all changes or a specific property on the model.
  save: function (attribute) {

    // Use all properties when saving for the first time
    if(! this._id) {
      return this.saveAll();
    }

    var json = {};

    // Save a specific attribute
    if(attribute) {
      json[ attribute ] = this[ attribute ];
      this._save(json, true);
    } else {
      // Save changed attributes
      var model = this;
      _.each(this._changed, function (attr) {
        json[ attr ] = model[ attr ];
      });
      this._save(json);
    }

    return this._id;
  },

  // Save all properties, ignoring changes.
  saveAll: function () {
    var json = this.toJSON();
    this._save(json);
    return this._id;
  }

};

// Extend a model from the current one
app.models.BaseModel.extend = function(model){
  // Add static properties
  _.extend(model, this);

  // Set up prototype chain
  model.prototype = new this();

  // Access to the parent's prototype object
  model.__super__ = this.prototype;
};