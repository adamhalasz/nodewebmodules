(function() {
	
	NWM.BoxModule = function(el) {
		this.el = el;
		this.addEventListeners();
	};

	NWM.BoxModule.prototype.addEventListeners = function() {
		var headers = this.headers();
		for (var i = 0, len = headers.length; i < len; i++) {
			headers.item(i).addEventListener('click', this.toogleContent);	
		}
	};

	NWM.BoxModule.prototype.toogleContent = function() {
		var classList = this.nextElementSibling.classList;
		if (classList.contains('box__main-highlight')) {
			classList.remove('box__main-highlight');
		} else {
			classList.add('box__main-highlight');
		}
	};

	NWM.BoxModule.prototype.headers = function() {
		return this.el.querySelectorAll('[data-module-header]');
	};

})();