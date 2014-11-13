// Simply add { authenticated: true } to your route's options
// to require users to login before they can access it.
Router.map(function() {
  this.route('authenticated', {
    path: '/examples/authenticated',
    authenticated: true
  });
});