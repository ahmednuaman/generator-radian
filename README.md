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

You can also use the generator to create stub files for a `controller`, `service`, `factory`, `directive`, `collection` and `vo`, by running `yo radian:TYPE 'NAME'`, eg:

```
$ yo radian:controller 'Foo Bar'
```

And this'll create a new controller called `FooBarController` (the ngApp name is `fooBarController`) here: `assets/js/controller/foo-bar-controller.coffee` and a unit test spec file here: `test/unit/controller/foo-bar-controller-spec.coffee`.

There is also a special generator for partials, simply run:

```
$ yo radian:partial 'Foo Bar'
```

And this'll create a new partial `assets/partial/foo-bar-partial.jade` as well as a new `sass` partial `assets/css/partial/_foo-bar.sass`.

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
