Meteor.startup(function () {

  // code to run on server at startup
  if(ActionTrackers.find().count() === 0) {
    ActionTrackers.insert({name: "Fighter", currentAV:20, baseAV:10 });
    ActionTrackers.insert({name: "Mage", currentAV:15, baseAV:10 });
  }

  if(MapTiles.find().count() === 0) {

    var mapWidth = 21, mapHeight = 12;

    for (var x=0;x<mapWidth;x++) {
      for (var y=0;y<mapHeight;y++) {
        MapTiles.insert({
          x: x, y: y, 
          type: "grass",
          status: {},
          occupants: []
        })
      }
    }

  }

  if(Things.find().count() === 0) {
    Things.insert({name: "thing 1" });
    Things.insert({name: "thing 2" });
  }
});