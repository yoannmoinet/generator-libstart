var fs = require('fs');
var conventionalChangelog = require('conventional-changelog');
var changelogFile = fs.createWriteStream('CHANGELOG.md');

conventionalChangelog({
	preset: 'angular'
}, {}, {
    // You'll want to add your first commit's hash in here,
    // otherwise it will take from the latest tag only.
	from: '',
	to: 'HEAD'
}).pipe(changelogFile);
