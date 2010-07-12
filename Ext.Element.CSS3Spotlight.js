Ext.Element.addMethods({
	CSS3Spotlight : function(o) {
		o = Ext.applyIf(o || {}, {
			skipAnim : false,
	        duration : 500,
	        easing   : "ease-in"
	    });
		var spot = Ext.DomHelper.append(Ext.getBody().dom, {
			tag: "div",
		}, true);
		
		this.spotlight = spot;
		
		var duration = (o.skipAnim === true) ? 0 : o.duration;
		
		spot.setStyle({
			"background-color" : "#000",
			"position" : "absolute",
			"top" : "0px",
			"left" : "0px",
			"width" : "100%",
			"height" : "100%",
			"z-index" : this.zindex-1,
			"opacity" : "0"
		});
		new Ext.util.DelayedTask(function() {
			spot.setStyle({
				"opacity" : "0.5",
				"-webkit-transform": "opacity",
				"-webkit-transition-timing-function": o.easing,
				"-webkit-transition-duration": duration+"ms",
				"-moz-transform": "opacity",
				"-moz-transition-timing-function": o.easing,
				"-moz-transition-duration": duration+"ms",
				"-o-transform": "opacity",
				"-o-transition-timing-function": o.easing,
				"-o-transition-duration": duration+"ms"
			});
		}).delay(100);
	},
	CSS3SpotlightHide : function(o) {
		o = Ext.applyIf(o || {}, {
			skipAnim : false,
	        duration : 500,
	        easing   : "ease-out"
	    });
		
		var duration = (o.skipAnim === true) ? 0 : o.duration;
		
		this.spotlight.setStyle({
			"opacity" : "0",
			"-webkit-transform": "opacity",
			"-webkit-transition-timing-function": o.easing,
			"-webkit-transition-duration": duration+"ms",
			"-moz-transform": "opacity",
			"-moz-transition-timing-function": o.easing,
			"-moz-transition-duration": duration+"ms",
			"-o-transform": "opacity",
			"-o-transition-timing-function": o.easing,
			"-o-transition-duration": duration+"ms"
		});
		new Ext.util.DelayedTask(function() {
			Ext.removeNode(this.spotlight.dom);
		}, this).delay(duration);
	}
});