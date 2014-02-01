(function() {
	
	NBM.BoxModule = function(el) {
		this.el = el;
		this.header = el.find('.js-box-module-header');

		this.addEventListener();
	};

	NBM.BoxModule.prototype.addEventListener = function() {
		this.header.on('click', function() {
			var main = $(this).next('.js-box-module-main');
			main.toggle();
		});
	};

})();