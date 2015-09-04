'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var fs = require('fs');
var async = require('async');
var exec = require('child_process').exec;

describe('generator libstart:app', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../generators/app'))
            .withOptions({skipInstall: true, noGitInspection: true})
            .withPrompts({
                libname: 'Testing Generator',
                name: 'Yoann Moinet',
                gitUsername: 'yoannmoinet',
                description: 'some description'
            })
            .on('end', done);
    });

    it('creates files', function () {
        assert.file([
            'bower.json',
            'package.json',
            '.editorconfig',
            '.jscsrc',
            '.eslintrc',
            './test/.eslintrc',
            './test/testing-generator.spec.js',
            './src/testing-generator.js',
            './bin/changelog.js',
            './bin/bowerSync.js'
        ]);
    });

    it('replaces values in bower.json and package.json', function (done) {
        async.parallel({
            bower: function (cb) {
                fs.readFile('./bower.json', cb);
            },
            pkg: function (cb) {
                fs.readFile('./package.json', cb);
            }
        }, function (err, results) {
            var bower = JSON.parse(results.bower);
            var pkg = JSON.parse(results.pkg);

            assert.equal(pkg.author, 'Yoann Moinet');
            assert.equal(pkg.name, 'Testing Generator');
            assert.equal(pkg.description, 'some description');
            assert.equal(pkg.main, './dist/testing-generator.js');
            assert.equal(pkg.scripts.format,
                'jscs ./src/testing-generator.js' +
                    './test/testing-generator.spec.js');
            assert.equal(pkg.scripts.lint,
                'eslint ./src/testing-generator.js' +
                    './test/testing-generator.spec.js');
            assert.equal(pkg.scripts.umd,
                'umd testing-generator ./src/testing-generator.js' +
                    './dist/testing-generator.js');
            assert.equal(pkg.scripts.uglify,
                'uglifyjs ./src/testing-generator.js' +
                    '-o ./dist/testing-generator.min.js -c -m');
            assert.equal(pkg.repository.url,
                'https://github.com/yoannmoinet/testing-generator.git');
            assert.equal(pkg.bugs.url,
                'https://github.com/yoannmoinet/testing-generator/issues');
            assert.equal(pkg.homepage,
                'https://github.com/yoannmoinet/testing-generator');

            assert.equal(bower.author, 'Yoann Moinet');
            assert.equal(bower.name, 'Testing Generator');
            assert.equal(bower.description, 'some description');
            assert.equal(bower.homepage,
                'https://github.com/yoannmoinet/testing-generator');
            done();
        });

    });
});
