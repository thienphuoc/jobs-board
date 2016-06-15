import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  if (Meteor.isServer) {
    Jobs._ensureIndex({
      "status": "text"
    });
  // This code only runs on the server
  Meteor.publish('search', function(searchValue) {
    if (!searchValue){
      return Jobs.find({});
    }
    console.log("Searching for ", searchValue);
    return Jobs.find({$text: {$search: searchValue}}, { sort: { createdAt: -1}});
  });
}
  // code to run on server at startup
});
