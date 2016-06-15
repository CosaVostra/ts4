import { Mongo } from 'meteor/mongo';

import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';

import { ReactiveVar } from 'meteor/reactive-var';

import '../imports/startup/index.js';

Todos = new Mongo.Collection('todos');

Lists = new Mongo.Collection('lists');

if(Meteor.isClient){

	Template.lists.onCreated(function () {
	    this.subscribe('lists');
	});

}

if(Meteor.isServer){
    // server code goes here
}

/*

MOVED TO imports/ui/todos/todos.js



*/ 
















