# LibStart

[![npm version](https://img.shields.io/npm/v/generator-libstart.svg?style=flat)](http://badge.fury.io/js/generator-libstart)
[![Build Status](https://img.shields.io/travis/yoannmoinet/generator-libstart.svg?style=flat)](https://travis-ci.org/yoannmoinet/generator-libstart)
[![Join the chat at https://gitter.im/yoannmoinet/generator-libstart](https://img.shields.io/badge/gitter-join%20chat-brightgreen.svg?style=flat)](https://gitter.im/yoannmoinet/generator-libstart?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> [Yeoman](http://yeoman.io) generator to start your UMD library.

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

The generator will even **reserve its name** on npm's registery if you whish to, thanks to [npmreserve](https://github.com/IonicaBizau/npmreserve).

----

#### Npm Scripts
##### `npm postest` (auto)
> Is run automatically after `npm test` and controls formatting and linting.

##### `npm preversion` (auto)
> Is run automatically before `npm bump` and runs `npm build`.

##### `npm postversion` (auto)
> Is run automatically after `npm bump` and will synchronize `bower.json` with `package.js`'s new version.

##### `npm build` (manual)
> It runs `test`, `changelog`, `umd` and `uglify`.

##### `npm test` (manual)
> Tests.

#### Custom Scripts
They are all run by the previous npm scripts but you can run them at your convenience.

##### `npm run-script format`
> Test the formatting with **JSCS**

##### `npm run-script lint`
> Lint with **ESLint**

##### `npm run-script umd`
> UMDify your library

##### `npm run-script changelog`
> Generate a changelog for your library based on your commits if you've followed one of the supported [convention](https://github.com/ajoslin/conventional-changelog/tree/master/conventions).

##### `npm run-script uglify`
> Uglify your library

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
|    ├ changelog.js    // Is run with 'npm run-script changelog'
|    └ postversion.js  // Is run with 'npm postversion'
|
└─── src
|    └ lib.js          // Main file
|
└─── test
     └ lib.spec.js     // Mocha tests
```

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

## License

MIT
