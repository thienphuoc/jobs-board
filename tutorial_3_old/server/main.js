import { Meteor } from 'meteor/meteor';
import '../imports/api/jobs.js';
Meteor.startup(() => {
  
  // code to run on server at startup
});

ServiceConfiguration.configurations.upsert({ 
    service: "facebook" 
  }, {
    $set: {
      appId: '1237055439646642',
      secret: '6d8b7d11638596f859bc867b4240af4d'
    }
  });
