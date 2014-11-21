// jshint ignore: start
var fs = require('fs'),
  args = process.argv,
  commands = []
  out = console.log;

/*
Directories
 */
var Dirs = {
  views: '../client/views',
  routes: '../routes',
  models: '../models',
  templates: 'templates'
}

/*
Models
 */
Command = function(command,description){
  this.command = command;
  this.description = description;
}
Command.prototype.run = function(){}


/*
Commands
 */

// Create view
var createView = new Command('create:view', 'client/views folder with template and JS skeletons');
createView.run = function(name){
  if(!name){
    return console.error('Provide the view name.');
  }

  // Create directory
  Files.makeDir(Dirs.views + '/' + name);

  // Load template view
  var tpl = fs.readFileSync(Dirs.templates + '/view/view.html').toString();

  // Replace vars
  tpl = Template.render(tpl, {
    viewName: name
  });

  // Write file
  fs.writeFileSync(Dirs.views + '/' + name + '/' + name + '.html', tpl);

  // Load template view javascript
  var tpl = fs.readFileSync(Dirs.templates + '/view/view.js').toString();

  // Replace vars
  tpl = Template.render(tpl, {
    viewName: name
  });

  // Write file
  fs.writeFileSync(Dirs.views + '/' + name + '/' + name + '.js', tpl);

  console.log('Created view named ' + name);
}
commands.push(createView);


// CRUD
var createCRUD = new Command('create:crud', 'client/views folder with CRUD for a model');
createCRUD.run = function(model){
  if(!model){
    return console.error('Provide a model name.')
  }

  // Create directory
  var dir = Dirs.views + '/' + model;
  Files.makeDir(dir);

  // Vars
  var name = lowerFirst(model);
  var upperName = capitaliseFirst(model);

  // Loop through files in the crud directory
  var cruddir = Dirs.templates + '/crud';
  var files = fs.readdirSync(cruddir);

  // Render all templates in the CRUD directory
  files.forEach(function(template){
    // Skip files that start with an underscore
    if(template.indexOf('_') == 0) return;

    var tpl = fs.readFileSync(cruddir + '/' + template).toString();
    tpl = Template.render(tpl, { modelName: name, upperModelName: upperName });

    var extension = template.match(/\.\w+$/g);
    var fileName = capitaliseFirst(template).replace(extension, '');
    fs.writeFileSync(dir + '/' + name + fileName + extension, tpl);
  })

  // Create routes
  var routes = fs.readFileSync(cruddir + '/_routes.js').toString();
  routes = Template.render(routes, { modelName: name, upperModelName: upperName });
  fs.writeFileSync(Dirs.routes + '/' + name + 'Route.js', routes);

  console.log('Created CRUD views and routes for ' + upperName);

}
commands.push(createCRUD);



// Create route
var createRoute = new Command('create:route', 'client/routes javascript file');
createRoute.run = function(name, path){
  if(!name){
    return console.error('Provide the route name.');
  }
  if(!path){
    return console.error('Provide the route\'s path.');
  }

  // Load template route
  var tpl = fs.readFileSync(Dirs.templates + '/route.js').toString();

  // Replace vars
  tpl = Template.render(tpl, {
    routeName: name,
    routePath: path
  });

  // Write file
  fs.writeFileSync(Dirs.routes + '/' + name + 'Route.js', tpl);
  console.log('Created route named ' + name);
}
commands.push(createRoute);


// Create model
var createModel = new Command('create:model', 'Model skeleton javascript file');
createModel.run = function(name){
  if(!name){
    return console.error('Provide the model name.');
  }
  name = capitaliseFirst(name);

  // Load template route
  var tpl = fs.readFileSync(Dirs.templates + '/model.js').toString();

  // Replace vars
  tpl = Template.render(tpl, {
    ModelName: name
  });

  // Write file
  fs.writeFileSync(Dirs.models + '/' + name + 'Model.js', tpl);
  console.log('Created model named ' + name);
}
commands.push(createModel);


// Create collection
var createCollection = new Command('create:collection', 'Collection with model, schema, publish and subscribe');
createCollection.run = function(name){
  if(!name){
    return console.error('Provide the collection name.');
  }
  name = capitaliseFirst(name);

  // Load template route
  var tpl = fs.readFileSync(Dirs.templates + '/collection.js').toString();

  // Replace vars
  tpl = Template.render(tpl, {
    ModelName: name
  });

  // Write file
  fs.writeFileSync(Dirs.models + '/' + name + 'Model.js', tpl);
  console.log('Created collection model named ' + name);
}
commands.push(createCollection);


/*
Files API
 */
var Files = {

  makeDir: function(path){
    if(!fs.existsSync(path)){
      return fs.mkdirSync(path);
    }else{
      return true;
    }
  }

}

/*
Template helpers
 */
var Template = {

  render: function(tpl, vars){
    for(var prop in vars){
      tpl = tpl.replace(new RegExp(prop, "g"), vars[prop]);
    }

    return tpl;
  }

}


/*
Helpers
 */
function capitaliseFirst(string)
{
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function lowerFirst(string)
{
  return string.charAt(0).toLowerCase() + string.slice(1);
}


/*
Execution
 */
if(args.length >= 3){

  var cmd;
  commands.forEach(function(command){
    if(command.command == args[2]){
      cmd = command;
      return false;
    }
  });

  if(!cmd){
    out('Invalid command.');
    return;
  }

  // Normalize arguments
  var cmdArgs = args.slice(3);
  cmd.run.apply(cmd, cmdArgs);

}
// Not enough arguments
else{

  out("              __               ___               ");
  out("             /\\ \\             /\\_ \\              ");
  out("  ___      __\\ \\ \\____  __  __\\//\\ \\      __     ");
  out("/' _ `\\  /'__`\\ \\ '__`\\/\\ \\/\\ \\ \\ \\ \\   /'__`\\   ");
  out("/\\ \\/\\ \\/\\  __/\\ \\ \\_\\ \\ \\ \\_\\ \\ \\_\\ \\_/\\ \\_\\.\\_");
  out("\\ \\_\\ \\_\\ \\____\\\\ \\_,__/\\ \\____/ /\\____\\ \\__/.\\_\\");
  out(" \\/_/\\/_/\\/____/ \\/___/  \\/___/  \\/____/\\/__/\\/_/");
  out("");
  out("               Where stars are born")
  out("");
  out("Commands:")
  commands.forEach(function(command){
    out("  " + command.command + " - " + command.description);
  });
  out("");

}