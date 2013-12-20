exports.config =
  # See docs at http://brunch.readthedocs.org/en/latest/config.html.
  sourceMaps: false
  conventions:
    assets: /^app\/assets\//
  modules:
    definition: false
    wrapper: false
  paths:
    public: '_public'
  files:
    javascripts:
      joinTo:
        'js/app.js': /^(bower_components|vendor|app)\/(?!bootstrap)/
      order:
        before: [
          # All vendor components should be built first in the order they are used.
          'bower_components/angular/angular.js'
          'vendor/angular-sanitize.js'
          # All vendor components should be built first in the order they are used.
        ]
        after: [
          'app/js/manet.js'
        ]

    stylesheets:
      joinTo:
        'css/app.css': /^(app|vendor|bower_components)/
      order:
        before: [
        ]

    templates:
      joinTo: 
        'js/dontUseMe' : /^app/ # dirty hack for Jade compiling.

  plugins:
     uglify:
      mangle: true
      compress:
        global_defs: 
          DEV: false

  # Enable or disable minifying of result js / css files.
  # minify: true
