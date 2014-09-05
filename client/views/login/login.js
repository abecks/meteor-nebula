AutoForm.hooks({
  loginForm: {
    onSubmit: function(doc){
      var form = this;
      Meteor.loginWithPassword(doc.email, doc.password, function(e){
        form.done();

        if(e){
          var schemaContext = app.schema.LoginForm.namedContext('loginForm');
          schemaContext.addInvalidKeys([
            { name: 'email', type: 'custom', value: e.reason }
          ]);
          return form.done();
        }

        var redirect = Session.get('loginRedirect');
        if(redirect){
          Router.go(redirect);
        }else{
          Router.go('/');
        }
      });
      return false;
    }
  }
})