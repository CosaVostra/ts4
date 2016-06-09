import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Todos = new Mongo.Collection('todos');


Meteor.startup(() => {
  // code to run on server at startup
});

