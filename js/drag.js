window.onload = function(){
	this.drag = new Drag('oDiv');
	drag.init();
}
function Drag(id){
	this.obj = document.getElementById(id);
	this.objX = 0;
	this.objY = 0;
}
Drag.prototype.init= function(){
	var This = this;
	this.obj.onmousedown = function(ev){
		var ev = ev || window.event;
			This.fnDown(ev);
		document.onmousemove = function(ev){
			var ev = ev || window.event;
			This.fnMove(ev);
		}
		document.onmouseup = function(){
			This.fnUp();
		}
	}
	
}

Drag.prototype.fnDown = function(ev){
	this.objX = ev.clientX - this.obj.offsetLeft;
	this.objY = ev.clientY - this.obj.offsetTop;
}
Drag.prototype.fnMove = function(ev){
	
	var left = ev.clientX - this.objX;
	var top = ev.clientY - this.objY;
	var cWidth = document.documentElement.clientWidth;
	var cHeight = document.documentElement.clientHeight;
	
	if(left<0){
		left = 0;
	}else if(left>cWidth - this.obj.offsetWidth){
		left = cWidth - this.obj.offsetWidth + "px";
	}
	
	if(top<0){
		top = 0;
	}else if(top>cHeight - this.obj.offsetHeight){
		top = cHeight - this.obj.offsetHeight + "px";
	}
	
	this.obj.style.left = left + "px";
	this.obj.style.top = top + "px";
	
}
Drag.prototype.fnUp = function(){
	document.onmousemove = null;
	document.onmouseup = null;
}
