Meteor.startup(function () {

  // code to run on server at startup
  if(ActionTrackers.find().count() === 0) {
    ActionTrackers.insert({name: "Fighter", currentAV:20, baseAV:10 });
    ActionTrackers.insert({name: "Mage", currentAV:15, baseAV:10 });
  }

  // code to run on server at startup
  if(Things.find().count() === 0) {
    Things.insert({name: "thing 1" });
    Things.insert({name: "thing 2" });
  }
});