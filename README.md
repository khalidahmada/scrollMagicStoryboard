# scrollMagicStoryboard
this is simple Extra function for ScrollMagic to organize you code using ScrollMagic on your project
Exemple
--------
```javascript
var controller = new ScrollMagic.Controller();

	Storyboard

	.add('section',[
		{
			tween : {
				m : 'to',
				set : { position:'relative'},
				s : '.h1',
				t : 2 ,
				a : {
					left : '-100%',
					opcity : 0,
				},
				offset :340 ,
				duration : 100,
			}
		}
	] , controller , ops)