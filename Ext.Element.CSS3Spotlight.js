Ext.Element.addMethods({
	CSS3Spotlight : function(o) {
		o = Ext.applyIf(o || {}, {
			skipAnim   : false,
	        duration   : 500,
	        easing     : "ease-in",
	        background : "#000000",
	        opacity    : 0.5
	    });
		if (this.spotlight) {
			return;
		} else {
			this.spotlight = Ext.DomHelper.append(Ext.getBody().dom, {
				tag: "div"
			}, true);
		}
		this.origZIndex = this.getStyle("z-index");
		this.setStyle("z-index", "20000");
		
		this.spotlight.setStyle({
			"background-color" : o.background,
			"position" : "absolute",
			"top" : "0px",
			"left" : "0px",
			"width" : "100%",
			"height" : "100%",
			"z-index" : 19999
		});
		
		if (o.skipAnim === true) {
			this.spotlight.setStyle("opacity", o.opacity);
			this.CSS3SpotlightMarkShowDone();
			if (o.callback) {
				o.callback();
			}
		} else {
			this.spotlight.setStyle("opacity", "0");
			this.CSS3SpotlightShow(o);
		}
	},
	CSS3SpotlightMarkShowDone : function() {
		
	},
	CSS3SpotlightMarkHideDone : function() {
		Ext.removeNode(this.spotlight.dom);
		this.setStyle("z-index", this.origZIndex);
		delete this.spotlight;
		delete this.origZIndex;
		if (this.callback) {
			this.callback();
			delete this.callback;
		}
	},
	CSS3SpotlightShow : function (o) {
		o = Ext.applyIf(o || {}, {
			skipAnim : false,
	        duration : 500,
	        easing   : "ease-out",
	        opacity  : 0.5
	    });
		new Ext.util.DelayedTask(function() {
			o.opactiy = 0.5;
			o.mastercallback = this.CSS3SpotlightMarkShowDone;
			this.CSS3SpotlightStartAnim(o);
		}, this).delay(100);
	},
	CSS3SpotlightHide : function(o) {
		o = Ext.applyIf(o || {}, {
			skipAnim : false,
	        duration : 500,
	        easing   : "ease-out",
	        opacity  : 0
	    });
		
		if (o.skipAnim === true) {
			Ext.removeNode(this.spotlight.dom);
			this.CSS3SpotlightMarkHideDone();
			if (o.callback) {
				o.callback();
			}
			return;
		}

		o.opactiy = 0;
		o.mastercallback = this.CSS3SpotlightMarkHideDone;
		this.CSS3SpotlightStartAnim(o);
	},
	CSS3SpotlightStartAnim : function(o) {
		o = Ext.applyIf(o || {}, {
	        duration : 500,
	        easing   : "ease-out"
	    });
		this.spotlight.setStyle({
			"opacity"                            : o.opacity,
			"-webkit-transform"                  : "opacity",
			"-webkit-transition-timing-function" : o.easing,
			"-webkit-transition-duration"        : o.duration+"ms",
			"-moz-transform"                     : "opacity",
			"-moz-transition-timing-function"    : o.easing,
			"-moz-transition-duration"           : o.duration+"ms",
			"-o-transform"                       : "opacity",
			"-o-transition-timing-function"      : o.easing,
			"-o-transition-duration"             : o.duration+"ms"
		});
		if (o.callback) {
			this.callback = o.callback;
		}
		if (Ext.isWebKit) {
			this.spotlight.addListener("webkitTransitionEnd", o.mastercallback, this, {
				single: true
			});
		} else if (Ext.isGecko4) {
			this.spotlight.addListener("transitionend", o.mastercallback, this, {
				single: true
			});
		} else if (Ext.isOpera) {
			this.spotlight.addListener("oTransitionEnd", o.mastercallback, this, {
				single: true
			});
		}
	}
});