/**
* Scroll Magic Story board
* This functions is extra function 
* (c) 2016 Digitz digitz.fr
* @auth khalid ahamda @khalidahmada
* Released under the MIT License.
*
* Scroll Magic (c) http://scrollmagic.io/
* TweenMax greensock (c) http://greensock.com
**/

(function webpackUniversalModuleDefinition(root, factory) {
    if (typeof exports === 'object' && typeof module === 'object')
        module.exports = factory();
    else if (typeof define === 'function' && define.amd)
        define(factory);
    else if (typeof exports === 'object')
        exports["Storyboard"] = factory();
    else
        root["Storyboard"] = factory();
})(this, function() {
        // static function
        var fn = function() {};
        var _helper = {
        	toObject : function(str){
        		var item = str.split(',');
        		var _obj  = {};
        		if(item.length){
	        		for(var i = 0 ; i< item.length;i++){
	        			var sec = item[i].split(':');
	        			_obj[sec[0]] = sec[1];
	        		}
        		}else{
        			var sec = item.split(':');
        			if(sec.length){
        				_obj[sec[0]] = sec[1];
        			}
        		}

        		return _obj;
        	}
        }
        var obj = {	
        	/*
        	* This function to using animating in attributes data with selector
        	* as first param
        	**/ 
        	fromElements : function(select , controller , options){
        		var items = document.querySelectorAll(select);
        		if(items && items.length){
        			for(var i=0;i<items.length;i++){
        				var item = items[i],
        					ops = {},
        					trigger  = item.getAttribute('data-dz-trigger'),
        					tween  = item.getAttribute('data-dz-tween'),
        					set  = item.getAttribute('data-dz-set'),
        					s  = item,
        					time = item.getAttribute('data-dz-time'),
        					method = item.getAttribute('data-dz-method'),
        					offset = item.getAttribute('data-dz-offset'),
        					duration = item.getAttribute('data-dz-duration');


        					obj.add(trigger , [{
								tween : {
									m : method || 'to',
									sep : true,
									set : _helper.toObject(set || ''),
									s : s,
									t : time || 1 ,
									a : _helper.toObject(tween || ''),
									offset : offset,
									duration : duration,
								},
        					}] , controller , options);

        			}
        		}

        		return obj;
        	},
        	add : function(trigger , tweensObj , controller ,options ){
        		// define Controller
        		// and trigger
				this.controller = controller;
				this.trigger = trigger;
				this.tweens = tweensObj;
				// Entry point
				this.init = function(){

					

					this.controller = controller;
					
					// Read Tweens
					var tweens = this.tweens,
						ln = tweens.length;

					for(var i = 0 ; i < ln ; i++){

						var itm = tweens[i].tween;
						// define selector to apply tweens
						var select = itm.sep ? itm.s :  ( this.trigger + ' ' + itm.s );

						// if the select value equal to @ is mean 
						// the selctor at this case is Trigger element it self
						select =  ( itm.s == '@' ? this.trigger : select);
						
						// if extra is defined that men the 
						var extra = itm.extra != undefined ? itm.extra : undefined;


						var twen = TweenMax[itm.m](select, itm.t , itm.a , extra);

						// set defaul setting on item on before proceed 
						// TweenMax function
						if(itm.set){
							TweenMax.set(select , itm.set);
						}

						// if stop falg is existe
						// dont trigger animation
						// this flag is useful on testing animations
						if( ! itm.stop)
							{
								/*
								* Return the Scene of ScrollMagic
								**/

								var ops = {
									triggerElement : this.trigger,
									duration:  itm.duration,
									//reverse : ( tweens[i].reverse ? true : false ),
								};

								if(itm.offset){
									ops.offset = itm.offset;
								}

								var scene = new ScrollMagic.Scene(ops)
								.setTween(twen)

								//.addIndicators({name: " (duration: )"}) 
								.addTo(controller);
								
								if(options && options.setPin){
									scene.setPin(options.setPin);
								}


								//return this;
							}
					} 
				}
				// init configs
				this.init();

				return obj;
			}

        }
        return obj;
})
