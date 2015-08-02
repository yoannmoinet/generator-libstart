var fs = require('fs');
var conventionalChangelog = require('conventional-changelog');
var changelogFile = fs.createWriteStream('CHANGELOG.md');

conventionalChangelog({
	preset: 'angular'
}, {}, {
	from: '',
	to: 'HEAD'
}).pipe(changelogFile);
