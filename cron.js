var 
	CronJob = require('cron').CronJob,
	Scraper = require('./scraper')
;
exports.start = function() {
	
	var job = new CronJob({
		cronTime: '00 00 00 * * *',
		onTick: function() {
			console.log("Schedule modules update");
			Scraper.start();
		},
		start: false
	});

	job.start();
	
};