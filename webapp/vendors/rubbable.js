(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['./libgif'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('./libgif'));
    } else {
        root.RubbableGif = factory(root.SuperGif);
    }
}(this, function (SuperGif) {
    var RubbableGif = function( options, name ) {
    	if(name == undefined) {
    		name = "";
    	}
    	var mouseMoved = false;
        var sup = new SuperGif( options );
        gifPlayers.push(sup);
        sup.playerName = name;
        var lastY, lastX;

        var register_canvas_handers = function () {

            var isvp = function(x) {
                return (options.vp_l ? ( x - options.vp_l ) : x );
            };

            var canvas = sup.get_canvas();
            var maxTime = 1000,
            // allow movement if < 1000 ms (1 sec)
                w = ( options.vp_w ? options.vp_w : canvas.width ),
                h = ( canvas.height ),
                maxDistance = Math.floor(w / (sup.get_length() * 2)),
            // swipe movement of 50 pixels triggers the swipe
                startX = 0,
                startTime = 0;

            var cantouch = "ontouchend" in document;

            var aj = 0;
            var last_played = 0;

            canvas.addEventListener((cantouch) ? 'touchstart' : 'mousedown', function (e) {
                // prevent image drag (Firefox)
                e.preventDefault();
                mouseMoved=false;
                
                gifPlayers.forEach(function (element ) {
	                if (element.get_auto_play()) {
	                	element.pause();
	                }
                });
                var pos = (e.touches && e.touches.length > 0) ? e.touches[0] : e;
                lastX = pos.screenX - pos.target.offsetLeft;
                lastY = pos.screenY - pos.target.offsetTop - 160;
                
                var x = (pos.layerX > 0) ? isvp(pos.layerX) : w / 2;
                var progress = x / w;

                //sup.move_to( Math.floor(progress * (sup.get_length() - 1)) );
                gifPlayers.forEach(function (element ) {
                	element.move_to(Math.floor(progress * (element.get_length() - 1)));
                });

                startTime = e.timeStamp;
                startX = isvp(pos.pageX);
            });

            canvas.addEventListener((cantouch) ? 'touchend' : 'mouseup', function (e) {
                startTime = 0;
                startX = 0;
                gifPlayers.forEach(function (element ) {
	                if (element.get_auto_play()) {
	                	element.play();
	                }
                });
                if(!mouseMoved) {
	                if (sup.playerName === "miniMap") {
	                	//debugger;
	                	if(lastY < (h / 2)) {
	                		// click on accident
	                		console.log("accident");
			                gifPlayers.forEach(function (element ) {
				                if (element.playerName === "liveStream") {
				                	element.pause();
				                	element.load_url(animations + "/rain_crash_2.gif", function() {element.play();});
				                }
			                });
	                	} else {
	                		if(lastX < (w / 2)) {
	                			// left car
	                		//console.log("left car");
	                		} else {
	                			// right car
	                		//console.log("right car");
	                		}
	                	}
	                }/*else if(sup.playerName ==="cockpit"){
	                		if(lastY < (h / 2)) {
	                		// click on accident
	                		console.log("accident");
			                gifPlayers.forEach(function (element ) {
				                if (element.playerName === "liveStream") {
				                	element.pause();
				                	element.load_url(animations + "/helmet.gif", function() {element.play();});
				                }
			                });
	                	} else {
	                		if(lastX < (w / 2)) {
	                			// left car
	                		//console.log("left car");
	                		} else {
	                			// right car
	                		//console.log("right car");
	                		}
	                }
                }*/
                }
                
            });

            canvas.addEventListener((cantouch) ? 'touchmove' : 'mousemove', function (e) {
                e.preventDefault();
                var pos = (e.touches && e.touches.length > 0) ? e.touches[0] : e;
				mouseMoved=true;
                var currentX = isvp(pos.pageX);
                var currentDistance;
                currentDistance = (startX === 0) ? 0 : Math.abs(currentX - startX);
                // allow if movement < 1 sec
                var currentTime = e.timeStamp;
                if (startTime !== 0 && currentDistance > maxDistance) {
                	
                gifPlayers.forEach(function (element ) {
                    if (currentX < startX && element.get_current_frame() > 0) {
                        element.move_relative(-1);
                    }
                    if (currentX > startX && element.get_current_frame() < element.get_length() - 1) {
                        element.move_relative(1);
                    }
                });
                    startTime = e.timeStamp;
                    startX = isvp(pos.pageX);
                }

                var time_since_last_play = e.timeStamp - last_played;
                {
                    aj++;
                    if (document.getElementById('tickles' + ((aj % 5) + 1))) {
                    	document.getElementById('tickles' + ((aj % 5) + 1)).play();
                    }
                    last_played = e.timeStamp;
                }


            });
        };

        sup.orig_load = sup.load;
        sup.load = function(callback) {
            sup.orig_load( function() {
                if (callback) {
                	callback();
                }
                register_canvas_handers( sup );
            } );
        };

        return sup;
    };

    return RubbableGif;
}));