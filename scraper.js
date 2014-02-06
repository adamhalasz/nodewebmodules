const NPM = 'http://registry.npmjs.org/';
var
	request = require('request'),
	level = require('level'),
	buildModule = require('./build_module'),
	GithubApi = require('github'),
	deleteStream = require('level-delete-stream'),
	modules = require('./modules.json'),
	db = level('./web_modules.db', {valueEncoding: 'json'})
;

exports.start =  function() {
	var 
		github = new GithubApi({version: "3.0.0", timeout: 10000}),
		dbKeyStream = db.createKeyStream()
	;
	
	console.log("Start Module Scrap");
	dbKeyStream.pipe(deleteStream(db, function(err) {
		if (err) { console.log('Error: %s', err); return; }

		Object.keys(modules).forEach(function(moduleName) {
			var 
				ghModuleName = modules[moduleName],
				ghUser = ghModuleName.split('/')[0],
				ghRepo = ghModuleName.split('/')[1],
				npmModuleUrl = NPM + moduleName + '/latest'
			;

			github.repos.get({user: ghUser, repo: ghRepo}, function(err, ghData) {
				if (err) { console.log('Error: %s', err); return; }		
				console.log("GH %s: %j\n===============\n", ghModuleName, ghData);

				request.get({url: npmModuleUrl, json: true}, function(err, res, npmData) {
					if (err) { console.log('Error: %s', err); return; }
					console.log("NPM %s: %j", npmModuleUrl, npmData);
				
					var moduleData = buildModule(ghData, npmData);

					db.put(moduleName, moduleData, function(err) {
						if (err) { console.log('Error: %s', err); return; }
						console.log("\nModule Data: %j\n-------------\n", moduleData);
					});				

				});

			});

		});

	}));
};

exports.list = function(callback) {
	var streamData = [];
	var stream = db.createValueStream();
	stream.on('data', function(result) {
		streamData.push(result);
	});
	stream.on('end', function(err) {
		var mostWatched = streamData.sort(function(a, b) { 
			return a.watchers < b.watchers; 
		});
		return callback(err, mostWatched);
	});
};