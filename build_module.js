var S = require('string')
	, moment = require('moment')
	, url = require('url')
;

module.exports = function(gh, npm) {

	var data = {};
	data["name"] = npm.name;
	data["title"] = S(npm.name).capitalize().s;
	data["description"] = gh.description;
	data["version"] = npm.version;
	data["engine"] = npm.engines && npm.engines.node;
	data["created_at"] = moment(gh.created_at).fromNow();
	data["author"] = npm.author && npm.author.name || npm._npmUser.name;
	data["forks"] = gh.forks_count;
	data["watchers"] = gh.watchers;
	data["issues"] = gh.open_issues;
	data["install"] = npm.name !== "meteor" ? ("npm install " + npm.name) : "curl https://install.meteor.com | /bin/sh";
	data["gh_url"] = gh.html_url;
	data["npm_url"] = npm.name !== "meteor" && ("https://npmjs.org/package/" + npm.name);
	data["site"] = gh.homepage && url.resolve('http://', gh.homepage);
	
	return data;
};