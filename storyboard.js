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
        return {

        	function(trigger , tweensObj){
        		// define Controller
        		// and trigger
				this.controller = new ScrollMagic.Controller();
				this.trigger = trigger;
				this.tweens = tweensObj;
				// Entry point
				this.init = function(){
					this.controller = new ScrollMagic.Controller();
					
					// Read Tweens
					var tweens = this.tweens,
						controller  = this.controller,
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
								new ScrollMagic.Scene({
									triggerElement : this.trigger,
									duration:  tweens[i].duration,
									offset:  tweens[i].offset,
									reverse : ( tweens[i].reverse ? true : false ),
								})
								.setTween(twen)
								.addTo(controller)
								
							}
					} 
				}
				// init configs
				this.init();
			}

        }
}
module.exports = CompetenceBox;