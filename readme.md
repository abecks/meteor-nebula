#meteor-nebula
---
##Where stars are born
Nebula is a Meteor boilerplate designed to help you get started making Meteor web apps quickly and easily.

Shout out to two other excellent boilerplates: [meteor-boilerplate](https://github.com/matteodem/meteor-boilerplate) and [Void](https://github.com/SachaG/Void).


##Features
- Recommended directory structure
- Models with inheritance and validation
- Included packages like Iron-Router, Collection2, Bootstrap3-less, and npm, give you all the essentials
- Tons of examples: collections, security, route configuration, CRUD operations
- Easily add NPM packages to your application with `packages.json` see [meteorhacks/npm](https://github.com/meteorhacks/npm) for instructions


##Routing

The router comes preconfigured with:

- An option to require the user to be authenticated before they can visit a route
- Loading template
- Not found template
- Update the page title when changing routes

##Packages
- standard-app-packages
- less
- jquery
- underscore
- accounts-base
- accounts-password
- iron:router
- meteorhacks:npm
- npm-container
- nemo64:bootstrap
- mrt:underscore-string-latest
- accounts-ui
- aldeed:collection2
- aldeed:autoform


##Directory Structure
This directory structure allows for clean, modular code:
 
```
client/                 # Client folder
    compatibility/      # Third-party libraries that create a global variable, or need to be loaded first
    config/             # Client-side configuration files
    helpers/            # Template helpers
    less                # LESS files    
    lib/                # Client-side library files that get executed first
    modules/            # Re-usable components and partials
    routes/             # Iron-Router routes
    startup/            # Client-side startup code
    subscriptions/      # Global subscriptions for the client
    views/              # Views/templates for your application
        common/         # General purpose templates (header, footer, etc.)
models/                 # Model files, with Collection, Schema and publish definitions
    lib/                # Models loaded first
private/                # Private files
public/                 # Public files
server/                 # Server-only files
    fixtures/           # Database fixtures
    lib/                # Server-side library files that get executed first
    methods/            # Meteor.methods definitions
    startup/            # On server startup
tests/                  # Velocity test files, can be run with mocha(*)
packages.json           # Add desired NPM packages here, load with Meteor.npmRequire
```


##Installation
- Install [Meteor](https://www.meteor.com/)
- Download the repository
- Run `meteor` in the root directory

##Getting Started
You will want to read the instructions for the following packages:

- [Meteor Documentation](http://docs.meteor.com/)
- [Iron Router - Basics](https://github.com/EventedMind/iron-router#basics)
- [Collection2 - Attached a Schema to a Collection](https://github.com/EventedMind/iron-router#basics)


##Recommended Packages
- Pagination with https://github.com/alethes/meteor-pages
- Google Analytics with https://github.com/reywood/meteor-iron-router-ga
- Testing with https://github.com/meteor-velocity/velocity
- Server console with https://github.com/gandev/meteor-server-console

##Helpful Resources
- [Discover Meteor](https://www.discovermeteor.com/)
- [Meteor Cookbook](https://github.com/awatson1978/meteor-cookbook/blob/master/readme.md)
- [Crater.io - Hacker News for Meteor](http://crater.io/)


##Todo
- Tests with https://github.com/meteor-velocity/velocity when they update to 0.9
- Boilerplate code generator
- User roles
- Pagination example
- Deployment script recommendations