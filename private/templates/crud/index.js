Template.modelNameIndex.rendered = function(){

};

Template.modelNameIndex.events({
  'click .delete': function(e){
    var $btn = $(e.currentTarget);
    var id = $btn.data('id');
    app.collections.upperModelName.remove(id);
  }
});

Template.modelNameIndex.helpers({

});