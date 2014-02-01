module.exports = function() {
	var 
		CronJob = require('cron').CronJob,
		Scraper = require('./scraper')
	;
		
	var job = new CronJob({
		cronTime: '00 00 00 * * *',
		onTick: function() {
			Scraper.start();
		},
		start: false
	});

	job.start();
	
};