function Drag() {

	this.diX = 0;
	this.diY = 0;
	this.winW = document.body.clientWidth || document.documentElement.clientWidth;
	this.winH = document.body.clientHeight || document.documentElement.clientHeight;
	this.iSpeedX = 0;
	this.iSpeedY = 0;
}
Drag.prototype.init = function (opt) {
	this.ElementId = document.getElementById(opt.id);
	var that = this;
	this.settings = {
		starMove: false,
		shadow: false
	}
	extend(this.settings, opt);
	this.ElementId.onmousedown = function (ev) {
		var ev = ev || window.event;
		that.fnDown(ev);
		return false;
	}
}
Drag.prototype.fnDown = function (ev) {

	if (this.settings.starMove) {
		var ev = ev || window.event;
		clearInterval(this.timer);
		this.prevX = ev.clientX;
		this.prevY = ev.clientY;
	}

	if (this.settings.shadow) {
		var ev = ev || window.event;
		this.oDivX = ev.clientX - this.ElementId.offsetLeft;
		this.oDivY = ev.clientY - this.ElementId.offsetTop;
		this.prevX = ev.clientX;
		this.prevY = ev.clientY;
		this.oDiv = document.createElement('div');
		this.oDiv.style.cssText = 'position:absolute;width:' + this.ElementId.offsetWidth + 'px;height:' + this.ElementId.offsetHeight + 'px;' +
			'top:' + this.ElementId.offsetTop + 'px;left:' + this.ElementId.offsetLeft + 'px;border:6px dotted #e1e1e1;background:transparent'
		document.body.appendChild(this.oDiv);
	}

	var that = this;
	this.oDivX = ev.clientX - this.ElementId.offsetLeft;
	this.oDivY = ev.clientY - this.ElementId.offsetTop;
	//				




	document.onmousemove = function (ev) {
		var ev = ev || window.event;
		that.fnMove(ev);
		return false;
	}
	document.onmouseup = function () {
		that.fnUp();
	}
	return false;
}
Drag.prototype.fnMove = function (ev) {
	var that = this;
	this.diX = ev.clientX - this.oDivX;
	this.diY = ev.clientY - this.oDivY;
	if (this.diX < 10) {
		this.diX = 0;
	} else if (this.diX > this.winW - this.ElementId.offsetWidth) {
		this.diX = this.winW - this.ElementId.offsetWidth;
	}

	if (this.diY < 10) {
		this.diY = 0;
	} else if (this.diY > this.winH - this.ElementId.offsetHeight) {
		this.diY = this.winH - this.ElementId.offsetHeight;
	}


	if (this.settings.shadow) {
		var ev = ev || window.event;
		this.ElementId.style.top = this.ElementId.offsetTop + 'px';
		this.ElementId.style.left = this.ElementId.offsetLeft + 'px';
		this.oDiv.style.top = this.diY + 'px';
		this.oDiv.style.left = this.diX + 'px';
	} else {
		this.ElementId.style.top = this.diY + 'px';
		this.ElementId.style.left = this.diX + 'px';
	}

	if (this.settings.starMove) {
		var ev = ev || window.event;
		this.iSpeedX = ev.clientX - this.prevX;
		this.iSpeedY = ev.clientY - this.prevY;
		this.prevX = ev.clientX;
		this.prevY = ev.clientY;
	}


}
Drag.prototype.fnUp = function () {
	var that = this;
	document.onmousemove = document.onmouseup = null;

	if (this.settings.shadow) {
		var ev = ev || window.event;
		this.ElementId.style.top = this.diY + 'px';
		this.ElementId.style.left = this.diX + 'px';
		document.body.removeChild(this.oDiv);
	}

	if (this.settings.starMove) {
		that.startMove();
	}
}

Drag.prototype.startMove = function () {
	clearInterval(this.timer);
	var that = this;
	this.timer = setInterval(function () {
		that.iSpeedY += 3;
		var L = that.ElementId.offsetLeft + that.iSpeedX;
		var T = that.ElementId.offsetTop + that.iSpeedY;

		if (L < 0) {
			L = 0;
			that.iSpeedX *= -1;
			that.iSpeedX *= 0.75;
		} else if (L > that.winW - that.ElementId.offsetWidth) {
			L = that.winW - that.ElementId.offsetWidth;
			that.iSpeedX *= -1;
			that.iSpeedX *= 0.75;
		}

		if (T < 0) {
			T = 0;
			that.iSpeedY *= -1;
			that.iSpeedY *= 0.75;
			that.iSpeedX *= 0.75;
		} else if (T > that.winH - that.ElementId.offsetHeight) {
			T = that.winH - that.ElementId.offsetHeight;
			that.iSpeedY *= -1;
			that.iSpeedY *= 0.75;
		}

		that.ElementId.style.top = T + 'px';
		that.ElementId.style.left = L + 'px';

	}, 30)
}

function extend(child, parent) {
	for (var attr in parent) {
		child[attr] = parent[attr];
	}
}