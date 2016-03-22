//playground.js

maxim1 = new Maxim();
maxim2 = new Maxim();
maxim3 = new Maxim();
player1 = maxim1.loadFile("arp.wav");
player1.setLooping(true);
player2 = maxim2.loadFile("snaredrum1.wav");
player2.setLooping(true);
player3 = maxim3.loadFile("drums1.wav");
player3.setLooping(true);


var d = {arp:player1,snare:player2,drums:player3};

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

playAll = function() {
  	player1.play();
	player2.play();
	player3.play();

}

setSpeed = function(speed) {

d["arp"].speed(speed/2);
	d["drums"].speed(speed);
	player3.speed(speed);

}


