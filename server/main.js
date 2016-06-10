import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Todos = new Mongo.Collection('todos');
Lists = new Meteor.Collection('lists');

Meteor.startup(() => {
  // code to run on server at startup
});

