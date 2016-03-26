//playground.js



/*
playDrums = function(){
	player1.volume(1);
}

stopDrums = function(){
	player1.volume(0);
}

playBass = function(){
	player2.volume(1);
}

stopBass = function(){
	player2.volume(0);
}

playArp = function(){
	player3.volume(1);
}

stopArp = function(){
	player3.volume(0);
}
*/

setVol = function(track, v) {
  console.log(" setting vol"+v + " for "+ track);
  d[track].volume(v);
}
setSpeed = function(track, speed) {
  console.log("setting speed"+speed+" for "+track);
  d[track].speed(speed);
}
