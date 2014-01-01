# generator-radian
[![Build Status](https://travis-ci.org/ahmednuaman/generator-radian.png?branch=v0.0.1)](https://travis-ci.org/ahmednuaman/generator-radian)

A [Radian](http://radian.io) generator for [Yeoman](http://yeoman.io).

## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### What is Radian?

Radian is a scalable AngularJS framework, find out more here: [http://radian.io](http://radian.io)

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-radian from npm, run:

```
$ npm install -g generator-radian
```

Finally, initiate the generator:

```
$ yo radian
```

You can then make use of the built in subgenerators to create your project files, you have the choice of two types of generators, you use them by running:

    yo radian:TYPE 'NAME'

- **TYPE**: is the generator you're wanting to use and...
- **NAME**: is the file/class/module name; this will be automatically slugified/camelized/classified for you, so it's better to write something like 'foo bar', rather than 'fooBar'.

### Generating CoffeeScript files

This generator will create a **TYPE**, say controller, in `assets/js/TYPE` and create a test spec in `test/unit/TYPE`; where **TYPE** is one of the following:

- controller
- service
- factory
- filter
- directive
- collection
- vo

Eg running:

    yo radian:controller 'foo bar'

Creates `assets/js/controller/foo-bar-controller.coffee` containing:

    define [
      'controller/radian-controller'
    ], (RC) ->
      class extends RC
        @register 'FooBarController', [
          '$scope'
        ]

        init: () ->

And `test/unit/controller/foo-bar-controller-spec.coffee` containing:

    define [
      'config'
      'angular'
      'controller/foo-bar-controller'
    ], (cfg, A) ->
      describe 'Foo Bar controller', () ->
        $scope = null
        createController = null

        beforeEach module cfg.ngApp

        beforeEach inject ($injector) ->
          $controller = $injector.get '$controller'
          $rootScope = $injector.get '$rootScope'

          $scope = $rootScope.$new()

          createController = () ->
            $controller 'fooBarController',
              $scope: $scope

        it 'should load', () ->
          controller = createController()

### Generating Jade and SASS files

This generator creates a Jade partial and an accompanying SASS partial, eg running:

    yo radian:partial 'my new view'

Creates `assets/css/partial/_my-new-view.sass` and `assets/partial/my-new-view-partial.jade`, and finally updates `assets/css/_partials.sass` to include the newly created SASS file.

### And then...

Running `grunt` will generate all the JS, CSS and HTML, and it'll also start the local server, so point your browser to [http://localhost:8000](http://localhost:8000) and you're laughing.

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
