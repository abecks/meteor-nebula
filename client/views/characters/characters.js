Template.characters.events({
  'click .delete': function(e){
    var $btn = $(e.currentTarget);
    var id = $btn.data('id');
    app.collections.Character.remove(id);
  }
});