var GameEngine = new Class({
	Extends:Fx,

	options:{
		fps:60,
		autostart:false,
		container:window,
		mouseEvents:['mousemove','mouseup','mousedown','click'],
		keyboardEvents:['keydown','keyup','keypress']
	},

	running:false,

	initialize:function(options){
		this.setOptions(options);

		if(typeOf(this.options.container)==='string') this.options.container = document.id(this.options.container);
		if(!this.options.container) return;

		['step','stop'].each(function(name){
			this[name] = this[name].bind(this);
		},this);

		// Add mouse events
		this.options.mouseEvents.each(function(eventName){
			this[eventName] = (function(event){
				event.gameInstance = this;
				this.fireEvent(eventName,event);
			}).bind(this);
		},this);

		// Add keyboard events
		this.options.keyboardEvents.each(function(eventName){
			this[eventName] = (function(event){
				event.gameInstance = this;
				this.fireEvent(eventName,event);
			}).bind(this);
		},this);

		if(this.options.autostart)
			this.start();
	},

	start:function(){
		if(this.running) return;
		this.running = true;

		this.options.mouseEvents.each(function(eventName){
			this.options.container.addEvent(eventName,this[eventName]);
		},this);

		this.options.keyboardEvents.each(function(eventName){
			window.addEvent(eventName,this[eventName]);
		},this);

		return this.parent();
	},

	step:function(){
		return this.fireEvent('loop');
	},

	stop:function(){
		return this.cancel();
	},

	cancel:function(){
		if(!this.running) return;

		this.options.mouseEvents.each(function(eventName){
			this.options.container.removeEvent(eventName,this[eventName]);
		},this);

		this.options.keyboardEvents.each(function(eventName){
			this.options.container.removeEvent(eventName,this[eventName]);
		},this);

		this.running = false;

		return this.parent();
	}
});