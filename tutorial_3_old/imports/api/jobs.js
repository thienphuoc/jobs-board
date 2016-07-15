import { Mongo } from 'meteor/mongo';

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Jobs = new Mongo.Collection("jobs");
export const Tags = new Mongo.Collection("tags");

if (Meteor.isServer) {
    Meteor.publish('jobs', function jobsPublication(){
        return Jobs.find({});
    });
    
    Meteor.publish('user', function userPublication(){
      return Meteor.users.find({_id: this.userId},{fields: {"services": 1}});
    });

    Meteor.publish('tags', function TagsPublication(){
      return Tags.find({user_id:this.userId});
    });
}

Meteor.methods({

  'jobs.insert'(text,hashTag){
    
    check(text,String);
    check(hashTag,[String]);

    if(!Meteor.userId()){
      throw new Meteor.Error('not-authorized');
    }
    console.log("vao insert");
    
    // Jobs.insert({status: text_1, hashtag:hashtagtext,createdAt: new Date()});

    Jobs.insert({
      avatar:Meteor.user().services.facebook.id,
      text:text,
      createdAt:new Date(),
      owner: Meteor.userId(),
      checked: false,
      username:Meteor.user().profile.name,
      hashtags:hashTag,
    });

    for(i=0;i<hashTag.length;i++){

      var isExistTag = Tags.find({tag:hashTag[i]}).count();
      if(isExistTag<=0) {
        
        var userid = []; userid.push(Meteor.userId());
        Tags.insert({tag:hashTag[i],user_id:userid});

      }
      else {

        var checkIsExist = Tags.find({$and:[{tag:hashTag[i]},{user_id:Meteor.userId()}]}).count();

        if(checkIsExist<=0){ //!checkIsExist
          Tags.update({tag:hashTag[i]},{$push:{user_id:Meteor.userId()}});  
        }
      }
    }//endfor
  },
  
  'jobs.remove'(jobId){
    check(jobId,String);
    const job = Jobs.findOne(jobId);
    if ( job.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    else
    {
      let tags = job.hashtags;
      
      for(i=0;i<tags.length;i++){
         if(Tags.find) 
         Tags.update({tag:tags[i]},{$pull:{user_id:Meteor.userId()}});

      var arrTags = Tags.find({user_id:{$size:0}}).fetch();
      
      for(i=0;i<arrTags.length;i++)
        Tags.remove(arrTags[i]._id);

      //console.log(arrTags);

         //console.log(tags[i]); 
      }
      Jobs.remove(jobId);
    }

  },

  'jobs.setChecked'(jobId,setChecked){
    
    check(jobId,String);
    check(setChecked,Boolean);

    const job = Jobs.findOne(jobId);

    if ( job.owner !== Meteor.userId()) {
            throw new Meteor.Error('not-authorized');
    }
    
    Jobs.update(jobId,{$set : {checked: !setChecked } });

  },

 

});