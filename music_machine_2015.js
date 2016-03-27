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

      player1.play();
      player2.play();
      player3.play();
      player4.play();
      player5.play();
      player6.play();
      player7.play();
      player8.play();
      return Session.get('startdac');
    },


"arpv":  function() {
  var  mm= MusicMachine.findOne();
  if (mm) {
      Template.instance().$('#arpvol').data('uiSlider').value(mm.arpvol);
      setVol("arp", mm.arpvol/50);
      return mm.arpvol;
    }
  },

"arpsp":  function() {
    var mm = MusicMachine.findOne();
    if (mm) {
        Template.instance().$('#arpspeed').data('uiSlider').value(mm.arpspeed);
        setSpeed("arp", mm.arpspeed/50);
        return mm.arpspeed;
      }
    },

"cymv":  function() {
      var  mm= MusicMachine.findOne();
      if (mm) {
          Template.instance().$('#cymvol').data('uiSlider').value(mm.cymvol);
          setVol("cym", mm.cymvol/50);
          return mm.cymvol;
        }
      },

"cymsp":  function() {
        var mm = MusicMachine.findOne();
        if (mm) {
            Template.instance().$('#cymspeed').data('uiSlider').value(mm.cymspeed);
            setSpeed("cym", mm.cymspeed/50);
            return mm.cymspeed;
          }
        },

"snav":  function() {
          var  mm= MusicMachine.findOne();
          if (mm) {
              Template.instance().$('#snavol').data('uiSlider').value(mm.snavol);
              setVol("sna", mm.snavol/50);
              return mm.snavol;
            }
          },

"snasp":  function() {
            var mm = MusicMachine.findOne();
            if (mm) {
                Template.instance().$('#snaspeed').data('uiSlider').value(mm.snaspeed);
                setSpeed("sna", mm.snaspeed/50);
                return mm.snaspeed;
              }
            },

"druv":  function() {
              var  mm= MusicMachine.findOne();
              if (mm) {
                  Template.instance().$('#druvol').data('uiSlider').value(mm.druvol);
                  setVol("dru", mm.druvol/50);
                  return mm.druvol;
                }
              },

"drusp":  function() {
                var mm = MusicMachine.findOne();
                if (mm) {
                    Template.instance().$('#druspeed').data('uiSlider').value(mm.druspeed);
                    setSpeed("dru", mm.druspeed/50);
                    return mm.druspeed;
                  }
                },

//last4
"b01v":  function() {
  var  mm= MusicMachine.findOne();
  if (mm) {
      Template.instance().$('#b01vol').data('uiSlider').value(mm.b01vol);
      setVol("b01", mm.b01vol/50);
      return mm.b01vol;
    }
  },

"b01sp":  function() {
    var mm = MusicMachine.findOne();
    if (mm) {
        Template.instance().$('#b01speed').data('uiSlider').value(mm.b01speed);
        setSpeed("b01", mm.b01speed/50);
        return mm.b01speed;
      }
    },

"b24v":  function() {
      var  mm= MusicMachine.findOne();
      if (mm) {
          Template.instance().$('#b24vol').data('uiSlider').value(mm.b24vol);
          setVol("b24", mm.b24vol/50);
          return mm.b24vol;
        }
      },

"b24sp":  function() {
        var mm = MusicMachine.findOne();
        if (mm) {
            Template.instance().$('#b24speed').data('uiSlider').value(mm.b24speed);
            setSpeed("b24", mm.b24speed/50);
            return mm.b24speed;
          }
        },

"b32v":  function() {
          var  mm= MusicMachine.findOne();
          if (mm) {
              Template.instance().$('#b32vol').data('uiSlider').value(mm.b32vol);
              setVol("b32", mm.b32vol/50);
              return mm.b32vol;
            }
          },

"b32sp":  function() {
            var mm = MusicMachine.findOne();
            if (mm) {
                Template.instance().$('#b32speed').data('uiSlider').value(mm.b32speed);
                setSpeed("b32", mm.b32speed/50);
                return mm.b32speed;
              }
            },

"hihv":  function() {
              var  mm= MusicMachine.findOne();
              if (mm) {
                  Template.instance().$('#hihvol').data('uiSlider').value(mm.hihvol);
                  setVol("hih", mm.hihvol/50);
                  return mm.hihvol;
                }
              },

"hihsp":  function() {
                var mm = MusicMachine.findOne();
                if (mm) {
                    Template.instance().$('#hihspeed').data('uiSlider').value(mm.hihspeed);
                    setSpeed("hih", mm.hihspeed/50);
                    return mm.hihspeed;
                  }
                },
//last4
  });


  Template.playground.events({

     "click button.startButton": function () {
      Session.set('startdac', 1);
      var val = MusicMachine.findOne({});
      MusicMachine.update({ _id: val._id }, {$set: {start: 1}});
    },


  });

  Template.playground.onRendered(function() {
    $('h2').hide();

//arp
    var arpspeedf = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {arpspeed: ui.value}});
    }, 50, { leading: false });

    if (!this.$('#arpspeed').data('uiSlider')) {
        $("#arpspeed").slider({
            slide: arpspeedf,
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

//cym
var cymspeedf = _.throttle(function(event, ui) {
    var val = MusicMachine.findOne({});
    MusicMachine.update({ _id: val._id }, {$set: {cymspeed: ui.value}});
}, 50, { leading: false });

if (!this.$('#cymspeed').data('uiSlider')) {
    $("#cymspeed").slider({
        slide: cymspeedf,
        min: 0,
        max: 100
    });
  }

var cymvolf= _.throttle(function(event, ui) {
      console.log("setting cymvol");
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {cymvol: ui.value}});
    }, 30, { leading: false });

    if (!this.$('#cymvol').data('uiSlider')) {
        $("#cymvol").slider({
            slide: cymvolf,
            min: 0,
            max: 100
        });
      }

  //dru
  var druspeedf = _.throttle(function(event, ui) {
              var val = MusicMachine.findOne({});
              MusicMachine.update({ _id: val._id }, {$set: {druspeed: ui.value}});
          }, 50, { leading: false });

          if (!this.$('#druspeed').data('uiSlider')) {
              $("#druspeed").slider({
                  slide: druspeedf,
                  min: 0,
                  max: 100
              });
            }

  var druvolf= _.throttle(function(event, ui) {
                console.log("setting druvol");
                  var val = MusicMachine.findOne({});
                  MusicMachine.update({ _id: val._id }, {$set: {druvol: ui.value}});
              }, 30, { leading: false });

              if (!this.$('#druvol').data('uiSlider')) {
                  $("#druvol").slider({
                      slide: druvolf,
                      min: 0,
                      max: 100
                  });
                }

    //sna
    var snaspeedf = _.throttle(function(event, ui) {
            var val = MusicMachine.findOne({});
            MusicMachine.update({ _id: val._id }, {$set: {snaspeed: ui.value}});
        }, 50, { leading: false });

      if (!this.$('#snaspeed').data('uiSlider')) {
            $("#snaspeed").slider({
                slide: snaspeedf,
                min: 0,
                max: 100
            });
          }

  var snavolf= _.throttle(function(event, ui) {
                          console.log("setting snavol");
                            var val = MusicMachine.findOne({});
                            MusicMachine.update({ _id: val._id }, {$set: {snavol: ui.value}});
                        }, 30, { leading: false });

                        if (!this.$('#snavol').data('uiSlider')) {
                            $("#snavol").slider({
                                slide: snavolf,
                                min: 0,
                                max: 100
                            });
                          }

///LAST4
//b01
    var b01speedf = _.throttle(function(event, ui) {
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {b01speed: ui.value}});
    }, 50, { leading: false });

    if (!this.$('#b01speed').data('uiSlider')) {
        $("#b01speed").slider({
            slide: b01speedf,
            min: 0,
            max: 100
        });
      }

        var b01volf= _.throttle(function(event, ui) {
          console.log("setting b01vol");
            var val = MusicMachine.findOne({});
            MusicMachine.update({ _id: val._id }, {$set: {b01vol: ui.value}});
        }, 30, { leading: false });

        if (!this.$('#b01vol').data('uiSlider')) {
            $("#b01vol").slider({
                slide: b01volf,
                min: 0,
                max: 100
            });
          }

//b24
var b24speedf = _.throttle(function(event, ui) {
    var val = MusicMachine.findOne({});
    MusicMachine.update({ _id: val._id }, {$set: {b24speed: ui.value}});
}, 50, { leading: false });

if (!this.$('#b24speed').data('uiSlider')) {
    $("#b24speed").slider({
        slide: b24speedf,
        min: 0,
        max: 100
    });
  }

var b24volf= _.throttle(function(event, ui) {
      console.log("setting b24vol");
        var val = MusicMachine.findOne({});
        MusicMachine.update({ _id: val._id }, {$set: {b24vol: ui.value}});
    }, 30, { leading: false });

    if (!this.$('#b24vol').data('uiSlider')) {
        $("#b24vol").slider({
            slide: b24volf,
            min: 0,
            max: 100
        });
      }

  //b32
  var b32speedf = _.throttle(function(event, ui) {
              var val = MusicMachine.findOne({});
              MusicMachine.update({ _id: val._id }, {$set: {b32speed: ui.value}});
          }, 50, { leading: false });

          if (!this.$('#b32speed').data('uiSlider')) {
              $("#b32speed").slider({
                  slide: b32speedf,
                  min: 0,
                  max: 100
              });
            }

  var b32volf= _.throttle(function(event, ui) {
                console.log("setting b32vol");
                  var val = MusicMachine.findOne({});
                  MusicMachine.update({ _id: val._id }, {$set: {b32vol: ui.value}});
              }, 30, { leading: false });

              if (!this.$('#b32vol').data('uiSlider')) {
                  $("#b32vol").slider({
                      slide: b32volf,
                      min: 0,
                      max: 100
                  });
                }

    //hih
    var hihspeedf = _.throttle(function(event, ui) {
            var val = MusicMachine.findOne({});
            MusicMachine.update({ _id: val._id }, {$set: {hihspeed: ui.value}});
        }, 50, { leading: false });

      if (!this.$('#hihspeed').data('uiSlider')) {
            $("#hihspeed").slider({
                slide: hihspeedf,
                min: 0,
                max: 100
            });
          }

  var hihvolf= _.throttle(function(event, ui) {
                          console.log("setting hihvol");
                            var val = MusicMachine.findOne({});
                            MusicMachine.update({ _id: val._id }, {$set: {hihvol: ui.value}});
                        }, 30, { leading: false });

                        if (!this.$('#hihvol').data('uiSlider')) {
                            $("#hihvol").slider({
                                slide: hihvolf,
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
player1 = maxim1.loadFile("arp.wav");
player1.setLooping(true);
player1.play();

maxim2 = new Maxim();
player2 = maxim2.loadFile("drums1.wav");
player2.setLooping(true);
player2.play();

maxim3 = new Maxim();
player3 = maxim3.loadFile("snaredrum1.wav");
player3.setLooping(true);
player3.play();

maxim4 = new Maxim();
player4 = maxim4.loadFile("cymbal1.wav");
player4.setLooping(true);
player4.play();


maxim5 = new Maxim();
player5 = maxim5.loadFile("bassdrum1.wav");
player5.setLooping(true);
player5.play();

maxim6 = new Maxim();
player6 = maxim6.loadFile("bassline24bit.wav");
player6.setLooping(true);
player6.play();

maxim7 = new Maxim();
player7 = maxim7.loadFile("bassline32bit.wav");
player7.setLooping(true);
player7.play();

maxim8 = new Maxim();
player8 = maxim8.loadFile("hihat2.wav");
player8.setLooping(true);
player8.play();



/*player2 = maxim2.loadFile("snaredrum1.wav");
player2.setLooping(true);
player3 = maxim3.loadFile("drums1.wav");
player3.setLooping(true);

player2.play();
player3.play();*/

d = {arp:player1,cym:player4,sna:player2,dru:player3,
      b01:player5,b24:player6,b32:player7,hih:player8};

});
}

if (Meteor.isServer) {
      MusicMachine.remove({});
      if (MusicMachine.find().count() === 0) {
      MusicMachine.insert({
        cymvol:50,cymspeed:50,
        druvol:50,druspeed:50,
        snavol:50,snaspeed:50,
        arpspeed: 50,arpvol:30,

        b01vol:50,b01speed:50,
        b24vol:50,b24speed:50,
        b32vol:50,b32speed:50,
        hihspeed: 50,hihvol:30,
        startdac:1});
    }

}
