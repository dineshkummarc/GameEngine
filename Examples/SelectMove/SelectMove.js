var SelectMove = new Class({

	Implements:Options,

	options:{
		className:'disc',
		selectedClass:'selected',
		x:0,
		y:0,  
		targetX:0,
		targetY:0, 
		friction:16
	},
	
	selected:false,
	moving:false,

	initialize:function(gameEngine,options){
		this.gameEngine = gameEngine;

		if(!this.gameEngine) return;

		this.setOptions(options);
		
		this.options.targetX = this.options.x;
		this.options.targetY = this.options.y;
		
		this.element = new Element('div',{
			'class':this.options.className,
			styles:{
				position:'absolute',
				top:this.options.y,
				left:this.options.x
			}
		}).inject(document.body);
		
		['enable','disable','elementClick','windowClick','loop'].each(function(eventName){
			this[eventName] = this[eventName].bind(this);
		},this);
		
		this.gameEngine.addEvents({
			start:this.enable,
			cancel:this.disable
		});
		
		if(this.gameEngine.running) this.enable();
	},
	
	elementClick:function(e){
		if(e && e.stop) e.stop();
		
		this.selected = (this.selected) ? false : true;
		
		if(this.selected) this.element.addClass(this.options.selectedClass);
		else this.element.removeClass(this.options.selectedClass);
	},
	
	windowClick:function(e){
		if(!this.selected) return;
		if(e && e.preventDefault) e.preventDefault();
		this.options.targetX = e.page.x;
		this.options.targetY = e.page.y;
		
		this.gameEngine.addEvent('loop',this.loop);
	},
	
	loop:function(){
		this.options.x+=Math.ceil((this.options.targetX-this.options.x)/this.options.friction);
		this.options.y+=Math.ceil((this.options.targetY-this.options.y)/this.options.friction);
		this.element.setStyles({
			top:this.options.y,
			left:this.options.x
		});
		
		if(
			this.options.x === this.options.targetX &&
			this.options.y === this.options.targetY
		) {
			this.gameEngine.removeEvent('loop',this.loop);
			this.elementClick();
		}
	},
	
	disable:function(){
		this.element.removeEvent('click',this.elementClick);
		this.gameEngine.removeEvent('click',this.windowClick);
	},
	
	enable:function(){
		this.element.addEvent('click',this.elementClick);
		this.gameEngine.addEvent('click',this.windowClick);
	}
});