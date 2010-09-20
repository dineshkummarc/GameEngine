var FollowMouse = new Class({
	
	Implements:Options,
	
	options:{
		x:0,
		y:0,  
		mouseX:0,
		mouseY:0,  
		friction:16,
		width:20,
		height:20,
		offsetX:-5,
		offsetY:-5,
		r:'255',
		g:'0',
		b:'0',
		a:1
	},
	
	initialize:function(gameEngine,options){
		this.gameEngine = gameEngine;
		
		if(!this.gameEngine) return;
		
		this.setOptions(options);
		
		this.element = new Element('div',{
			styles:{
				background:'rgba('+this.options.r+','+this.options.g+','+this.options.b+','+this.options.a+')',
				width:this.options.width,
				height:this.options.height,
				marginTop:this.options.offsetY,
				marginLeft:this.options.offsetX,
				top:this.options.y,
				left:this.options.x,
				position:'absolute'
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
		this.options.x+=(this.options.mouseX-this.options.x)/this.options.friction;  
		this.options.y+=(this.options.mouseY-this.options.y)/this.options.friction;
		this.element.setStyles({
			top:this.options.y,
			left:this.options.x
		});
	}
});