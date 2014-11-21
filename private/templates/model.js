"use strict";

app.models.ModelName = function(properties){

  // Massive assignment
  _.extend(this, properties);
};
app.models.BaseModel.extend(app.models.ModelName);

// Prototype functions
_.extend(app.models.ModelName.prototype, {

});