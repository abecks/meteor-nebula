Template.testIndex.rendered = function(){

};

Template.testIndex.events({
  'click .delete': function(e){
    var $btn = $(e.currentTarget);
    var id = $btn.data('id');
    app.collections.Test.remove(id);
  }
});

Template.testIndex.helpers({

});