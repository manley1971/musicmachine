Router.configure({
    layoutTemplate: 'ApplicationLayout'
  });
  // specify the top level route, the page users see when they arrive at the site
Router.route('/', function () {
    console.log("rendering root /");
    this.render("navbar", {to:"header"});
    this.render("lobby_page", {to:"main"});
  });

//This code is for everyone. Could go in common.js
MusicMachine = new Mongo.Collection("musicMachine");


if (Meteor.isClient) {

  Meteor.startup(function () {

});


  Template.playground.helpers({

    "startdac": function () {

      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.start==1) {
          playAll();
        }
      }

      return Session.get('startdac');
    },

    "drums": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.drums==1) {
          playDrums();

        } else if (starter.drums==0) {

          stopDrums();

        }
      }

      return Session.get('drums');
    },

    "bass": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.bassline==1) {
          playBass();

        } else if (starter.bassline==0) {

          stopBass();

        }
      }
      return Session.get('bass');
    },

    "arp": function () {
      var starter = MusicMachine.findOne();
      if (starter) {
        if (starter.arp==1) {
          playArp();

        } else if (starter.arp==0) {

          stopArp();

        }
      }
      return Session.get('arp');
    },



    //don't forget the commas between each function
//the last one doesn't have to have one!
"sliderVal2":  function() {
  var  mm= MusicMachine.findOne();
  if (mm) {
      Template.instance().$('#arpvol').data('uiSlider').value(mm.arpvol);
      setVol(mm.arpvol/50);
      return mm.arpvol;
    }
  },

  "sliderVal1":  function() {
    var mm = MusicMachine.findOne();
    if (mm) {
        Template.instance().$('#slider1').data('uiSlider').value(mm.slide);
        setSpeed(mm.slide/50);
        return mm.slide;
      }
    },

  });


  Template.playground.events({

     "click button.startButton": function () {
      Session.set('startdac', 1);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {start: 1}});
    },

     "click button.myButton1": function () {
      Session.set('drums', 1);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {drums: 1}});

    },
      "click button.myButton2": function () {
      Session.set('drums', 0);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {drums: 0}});
    },

      "click button.myButton3": function () {
      Session.set('bass', 1);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {bassline: 1}});

    },

      "click button.myButton4": function () {
      Session.set('bass', 0);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {bassline: 0}});

    },
      "click button.myButton5": function () {
      Session.set('arp', 1);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {arp: 1}});

    },

      "click button.myButton6": function () {
      Session.set('arp', 0);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {arp: 0}});

    }

  });

  Template.playground.onRendered(function() {
    $('h2').hide();

    var track1speed = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {slide: ui.value}});
    }, 50, { leading: false });

    if (!this.$('#slider1').data('uiSlider')) {
        $("#slider1").slider({
            slide: track1speed,
            min: 0,
            max: 100
        });
      }

        var arpvolf= _.throttle(function(event, ui) {
          console.log("setting arpvol");
            var val = MusicMachine.findOne({});
            MusicMachine.update({ _id: val._id }, {$set: {arpvol: ui.value}});
        }, 30, { leading: false });

        if (!this.$('#arpvol').data('uiSlider')) {
            $("#arpvol").slider({
                slide: arpvolf,
                min: 0,
                max: 100
            });

    }
  });

  Meteor.startup(function () {

      console.log("creating instrument tracks");

      for (var i=1;i<9;i++){
        var  t = "track"+i+".wav";
        console.log("creating a track"+t);
      }

maxim1 = new Maxim();
maxim2 = new Maxim();
maxim3 = new Maxim();
player1 = maxim1.loadFile("arp.wav");
player1.setLooping(true);
player2 = maxim2.loadFile("snaredrum1.wav");
player2.setLooping(true);
player3 = maxim3.loadFile("drums1.wav");
player3.setLooping(true);
player1.play();
player2.play();
        player3.play();
        d = {arp:player1,snare:player2,drums:player3};

});
}

if (Meteor.isServer) {
      MusicMachine.remove({});
      if (MusicMachine.find().count() === 0) {
      MusicMachine.insert({slide: 50,arpvol:30});
    }

}
