# LibStart

> [Yeoman](http://yeoman.io) generator to start your UMD library.

[![npm version](https://img.shields.io/npm/v/generator-libstart.svg?style=flat-squared)](http://badge.fury.io/js/generator-libstart)
[![Build Status](https://img.shields.io/travis/yoannmoinet/generator-libstart.svg?style=flat-squared)](https://travis-ci.org/yoannmoinet/generator-libstart)
[![Join the chat at https://gitter.im/yoannmoinet/generator-libstart](https://img.shields.io/badge/gitter-join%20chat-brightgreen.svg?style=flat-squared)](https://gitter.im/yoannmoinet/generator-libstart?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

----

## Getting Started
If you'd like to get to know Yeoman better check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).

----

### Overview
This generator will create a basic scaffolding of a generic [UMD](https://github.com/umdjs/umd) library.

It will come with :
- changelog generator ([conventional-changelog](https://github.com/ajoslin/conventional-changelog))
- linting ([eslint](http://eslint.org/))
- formatting ([jscs](http://jscs.info/))
- testing ([mocha](http://mochajs.org/) + [expect.js](https://github.com/Automattic/expect.js))
- building ([uglify-js](https://github.com/mishoo/UglifyJS2) + [umd](https://github.com/ForbesLindesay/umd))

----

### Install
To install generator-libstart from npm, run:

```bash
npm install -g yo generator-libstart
```

Finally, initiate the generator:

```bash
yo libstart
```

----

### Usage

To generate your new library simply run :

```bash
yo libstart <name of your creation>
```

Answer to some questions and you're good to go.

You'll be able to reserve your library's name into npm's registry if you whish to.

In your new library, you'll have some scripts available to automate your development.

#### Npm Scripts
##### `npm preversion` (auto)
> It runs `npm build`.

##### `npm postversion` (auto)
> It runs `bowerSync` and `changelog`.

##### `npm pretest` (auto)
> It runs `build`.

##### `npm test` (manual)
> It launches tests with mocha.

##### `npm postest` (auto)
> It runs `format` and `lint`.

#### Custom Scripts
They are all run by the previous npm scripts but you can run them at your convenience.

##### `npm run prebuild` (manual)
> It runs `format` and `lint`.

##### `npm run build` (manual)
> It runs `umd` and `uglify`.

##### `npm run format`
> Test the formatting with **JSCS**

##### `npm run lint`
> Lint with **ESLint**

##### `npm run umd`
> It packages your library with [umd](https://www.npmjs.com/package/umd)

##### `npm run changelog`
> Generate a changelog for your library based on your commits if you've followed one of the supported [convention](https://github.com/ajoslin/conventional-changelog/tree/master/conventions),
> and will commit the changes automatically.

##### `npm run bowerSync`
> It synchronizes bower.json's version with package.json's,
> and will commit the changes automatically.

##### `npm run uglify`
> It uglifies your library.

----

### Structure

```javascript
library
├ .eslintrc           // Basic ESLint config
├ .editorconfig       // Basic Editor config
├ .jscsrc             // Basic JSCS config
├ README.md
├ LICENSE
├ package.json
├ bower.json
│
└─── bin               // Helpers for npm scripts
|    ├ changelog.js    // Is run with 'npm run changelog'
|    └ bowerSync.js    // Is run with 'npm postversion'
|
└─── src
|    └ lib.js          // Main file
|
└─── test
     └ lib.spec.js     // Mocha tests
```

----

## License

MIT
