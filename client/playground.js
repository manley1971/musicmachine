//playground.js

//Here is the real code that controls the actual sliders. It assumes all the music
//tracks are in the "d" array that stores all the data.

setVol = function(track, v) {
  console.log(" setting vol"+v + " for "+ track);
  d[track].volume(v);
}
setSpeed = function(track, speed) {
  console.log("setting speed"+speed+" for "+track);
  d[track].speed(speed);
}
