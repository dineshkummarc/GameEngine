var FollowMouse = new Class({
	
	Implements: Options,
	
	options: {
		className: 'disc',
		x: 0,
		y: 0,  
		mouseX: 0,
		mouseY: 0,  
		friction: 16,
		color:'rgba(255,0,0,1)'
	},
	
	initialize:function(gameEngine,options){
		this.gameEngine = gameEngine;
		
		if (!this.gameEngine) return;
		
		this.setOptions(options);
		
		this.element = new Element('div',{
			'class': this.options.className,
			styles: {
				background: this.options.color,
				top: this.options.y,
				left: this.options.x,
				position: 'absolute'
			}
		}).inject(document.body);
		
		this.gameEngine.addEvent('loop',this.loop.bind(this));
		this.gameEngine.addEvent('mousemove',this.mouseMove.bind(this));
	},
	
	mouseMove:function(e){
		this.options.mouseX = e.page.x;
		this.options.mouseY = e.page.y;
	},
	
	loop:function(){
		this.options.x += (this.options.mouseX - this.options.x) / this.options.friction;  
		this.options.y += (this.options.mouseY - this.options.y) / this.options.friction;
		this.element.setStyles({
			top: this.options.y,
			left: this.options.x
		});
	}
});