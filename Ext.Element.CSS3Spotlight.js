Ext.Element.addMethods({
	CSS3Spotlight : function(o) {
		o = Ext.applyIf(o || {}, {
			skipAnim : false,
	        duration : 500,
	        easing   : "ease-in"
	    });
		if (this.spotlight) {
			if (this.spotlight.active === true) {
				return;
			}
		} else {
			this.spotlight = Ext.DomHelper.append(Ext.getBody().dom, {
				tag: "div"
			}, true);
		}
		this.spotlight.active = true;
		
		this.spotlight.setStyle({
			"background-color" : "#000",
			"position" : "absolute",
			"top" : "0px",
			"left" : "0px",
			"width" : "100%",
			"height" : "100%",
			"z-index" : this.zindex-1
		});
		
		if (o.skipAnim === true) {
			this.spotlight.setStyle("opacity", "0.5");
			this.CSS3SpotlightMarkShowDone();
		} else {
			this.spotlight.setStyle("opacity", "0");
			this.CSS3SpotlightShow(o);
		}
	},
	CSS3SpotlightMarkShowDone : function() {
		this.spotlight.active = false;
	},
	CSS3SpotlightMarkHideDone : function() {
		Ext.removeNode(this.spotlight.dom);
		this.spotlight.active = false;
		delete this.spotlight;
		return;
	},
	CSS3SpotlightShow : function (o) {
		o = Ext.applyIf(o || {}, {
			skipAnim : false,
	        duration : 500,
	        easing   : "ease-out",
	        opacity  : 0.5,
	        callback : Ext.emptyFn
	    });
		new Ext.util.DelayedTask(function() {
			o.opactiy = 0.5;
			o.callback = this.CSS3SpotlightMarkShowDone;
			this.CSS3SpotlightStartAnim(o);
		}, this).delay(100);
	},
	CSS3SpotlightHide : function(o) {
		this.spotlight.active = true;
		o = Ext.applyIf(o || {}, {
			skipAnim : false,
	        duration : 500,
	        easing   : "ease-out",
	        opacity  : 0,
	        callback : Ext.emptyFn
	    });
		
		if (o.skipAnim === true) {
			Ext.removeNode(this.spotlight.dom);
			this.CSS3SpotlightMarkHideDone();
			return;
		}

		o.opactiy = 0;
		o.callback = this.CSS3SpotlightMarkHideDone;
		this.CSS3SpotlightStartAnim(o);
	},
	CSS3SpotlightStartAnim : function(o) {
		o = Ext.applyIf(o || {}, {
	        duration : 500,
	        easing   : "ease-out"
	    });
		this.spotlight.setStyle({
			"opacity" : o.opacity,
			"-webkit-transform": "opacity",
			"-webkit-transition-timing-function": o.easing,
			"-webkit-transition-duration": o.duration+"ms",
			"-moz-transform": "opacity",
			"-moz-transition-timing-function": o.easing,
			"-moz-transition-duration": o.duration+"ms",
			"-o-transform": "opacity",
			"-o-transition-timing-function": o.easing,
			"-o-transition-duration": o.duration+"ms"
		});
		if (Ext.isWebKit) {
			this.spotlight.addListener("webkitTransitionEnd", o.callback, this, {
				single: true
			});
		} else if (Ext.isGecko4) {
			this.spotlight.addListener("transitionend", o.callback, this, {
				single: true
			});
		} else if (Ext.isOpera) {
			this.spotlight.addListener("oTransitionEnd", o.callback, this, {
				single: true
			});
		}
	}
});