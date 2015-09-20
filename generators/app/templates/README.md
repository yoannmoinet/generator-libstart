# <%= libname %>

> <%= description %>

----

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
