'use strict';

var path = require('path');
var fs = require('fs');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var exec = require('child_process').exec;
var _ = require('lodash');
var async = require('async');
var npmReserve = require('npmreserve');

module.exports = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);
        this.argument('libname', {
            desc: 'The name of your library.',
            required: false,
            type: String,
            default: path.basename(process.cwd())
        });
    },
    initializing: function () {
        var self = this;
        var done = self.async();
        self.prefs = {
            author: {}
        };

        // Get local git
        if (self.options.noGitInspection) {
            done();
        } else {
            async.parallel({
                name: function (cb) {
                    exec('git config --get user.name', cb);
                },
                email: function (cb) {
                    exec('git config --get user.email', cb);
                }
            }, function (err, results) {
                if (!err) {
                    self.gitResults = {
                        email: _.trim(results.email.join('')),
                        name: _.trim(results.name.join(''))
                    };
                }
                done();
            });
        }
    },
    prompting: function () {
        var self = this;
        var done = self.async();

        // Have Yeoman greet the user.
        self.log(yosay(
          'Welcome to the ' + chalk.bgBlue(' Libstart ') + ' generator!'
        ));

        // Apply local git user
        if (self.gitResults) {
            self.prefs.author = _.extend({
                full: self.gitResults.name + ' <' + self.gitResults.email + '>',
                email: self.gitResults.email,
                name: self.gitResults.name
            });
        }

        var prompts = [{
            type: 'input',
            name: 'libname',
            message: 'The name of your library.',
            default: self.libname || path.basename(process.cwd())
        },
        {
            type: 'confirm',
            name: 'npmReserved',
            message: 'Would you like to reserve the name on npm\'s registry?',
            default: true
        },
        {
            type: 'input',
            name: 'name',
            message: 'What\'s your name ?',
            required: true,
            default: self.gitResults ? self.prefs.author.full : undefined
        },
        {
            type: 'input',
            name: 'gitUsername',
            message: 'What\'s your git\'s username ?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'What\'s the description of your project ?'
        }];

        self.prompt(prompts, function (props) {
            self.prefs.libRealName = props.libname;
            self.prefs.libname =  _.kebabCase(props.libname);
            self.prefs.hasGit = props.gitUsername ? true : false;
            self.prefs.author.name = props.name;
            self.prefs.author.username = props.gitUsername;
            self.prefs.description = props.description;
            self.prefs.npmReserved = props.npmReserved;
            done();
        });
    },

    configuring: {
        projectfiles: function () {
            this.fs.copy(
              this.templatePath('eslintrc'),
              this.destinationPath('.eslintrc')
            );

            this.fs.copy(
                this.templatePath('./test/eslintrc'),
                this.destinationPath('./test/.eslintrc')
            );

            this.fs.copy(
              this.templatePath('jscsrc'),
              this.destinationPath('.jscsrc')
            );

            this.fs.copy(
              this.templatePath('editorconfig'),
              this.destinationPath('.editorconfig')
            );

            this.fs.copy(
              this.templatePath('gitignore'),
              this.destinationPath('.gitignore')
            );

            this.fs.copy(
              this.templatePath('gitattributes'),
              this.destinationPath('.gitattributes')
            );
        }
    },

    writing: {
        lib: function () {
            this.fs.copyTpl(
              this.templatePath('_package.json'),
              this.destinationPath('package.json'),
              this.prefs
            );

            this.fs.copyTpl(
              this.templatePath('_bower.json'),
              this.destinationPath('bower.json'),
              this.prefs
            );

            this.fs.copyTpl(
              this.templatePath('README.md'),
              this.destinationPath('README.md'),
              this.prefs
            );

            this.fs.copyTpl(
              this.templatePath('LICENSE'),
              this.destinationPath('LICENSE'),
              this.prefs
            );

            this.fs.copyTpl(
                this.templatePath('./test/lib.spec.js'),
                this.destinationPath('./test/' + this.prefs.libname + '.spec.js'),
                this.prefs
            );

            this.fs.copyTpl(
                this.templatePath('./src/lib.js'),
                this.destinationPath('./src/' + this.prefs.libname + '.js'),
                this.prefs
            );

            this.fs.copyTpl(
                this.templatePath('./bin/*'),
                this.destinationPath('./bin/'),
                this.prefs
            );
        }
    },

    install: function () {
        this.npmInstall('conventional-changelog', {saveDev: true});
        this.npmInstall('eslint', {saveDev: true});
        this.npmInstall('expect.js', {saveDev: true});
        this.npmInstall('jscs', {saveDev: true});
        this.npmInstall('mocha', {saveDev: true});
        this.npmInstall('uglify-js', {saveDev: true});
        this.npmInstall('umd', {saveDev: true});
    },

    end: function () {
        var self = this;
        self.log('Initializing GIT...');
        exec('git init', function (err) {
            if (!err && self.prefs.npmReserved) {
                self.log('Reserving ' + chalk.green(self.prefs.libname) + ' on npm...');
                fs.readFile(path.join(process.cwd(), 'package.json'), function (err, data) {
                    npmReserve(JSON.parse(data), function (err) {
                        if (!err) {
                            self.log(chalk.green('Package successfuly registered on https://www.npmjs.com/package/' + self.prefs.libname));
                        } else {
                            self.log(chalk.red('Sorry, could not registered library on npm\'s registry.'));
                            self.log(chalk.dim(err));
                        }
                    });
                });
            }
        });
    }
});
