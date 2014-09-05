SimpleSchema.messages({
  alreadyRegistered: 'That email has already been registered.'
});

AutoForm.hooks({
  registerForm: {
    onSubmit: function(doc){
      var form = this;

      // Use the email for the username, change this if you want
      // to keep usernames
      doc.username = doc.email;

      Accounts.createUser(doc, function(e){
        form.done();
        if(e){
          var schemaContext = app.schema.RegisterForm.namedContext('registerForm');
          schemaContext.addInvalidKeys([
            { name: 'email', type: 'custom', value: e.reason }
          ]);
          return;
        }

        Router.go('/');
      });
      return false;
    }
  }
})