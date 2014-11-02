// Router specific configuration
"use strict";

Router.configure({
  // The main layout template for the app
  layoutTemplate: 'mainLayout',

  // If your data value or function returns null or undefined, a
  // not found template will be rendered
  notFoundTemplate: 'notFound',

  // The default loading template
  loadingTemplate: 'loading'
});

// Render the loading template before each route
Router.onBeforeAction('loading');

// Render the not found template if no data is returned by a route
Router.onBeforeAction('dataNotFound');

// Set the page title to the current route's name
Router.onAfterAction(function() {

  // Get the name of the current route
  var title = this.route.options.title;
  if(! title){
    title = _(this.route.name).titleize();
  }
  document.title = title + ' - ' + app.name;

  this.next();
});


// Require users to be logged in before running the route.
// Simply put { authenticated: true } in the options for the route's
// you want to secure.
Router.onBeforeAction( function(){
  if(! this.route.options.authenticated){
    this.next();
    return;
  }

  var loadingTemplate = this.route.options.loadingTemplate;
  if(! loadingTemplate){
    loadingTemplate = Router.options.loadingTemplate;
  }

  // Wait for the user's data to sync
  if(Meteor.loggingIn()) {
    this.render('loading');
  }
  // Check if the user is authenticated
  else if(! Meteor.user()) {
    Session.set('loginRedirect', this.route.name);
    Router.go('login');
  }else{
    this.next();
  }
});


// Clear any open Bootstrap modals when changing routes.
function clearModals() {
  $('.modal.in').remove();
  $('.modal-backdrop').remove();
  this.next();
}
Router.onBeforeAction(clearModals);