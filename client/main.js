import { Mongo } from 'meteor/mongo';

import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';

import { ReactiveVar } from 'meteor/reactive-var';

import '../imports/startup/index.js';

Todos = new Mongo.Collection('todos');

Lists = new Mongo.Collection('lists');

Clients = new Mongo.Collection('clients');

Projects = new Mongo.Collection('projects');

if(Meteor.isClient){

	Template.lists.onCreated(function () {
	    this.subscribe('lists');
	});


	Template.clientProjects.onCreated(function () {
	    this.subscribe('projects');
	});


}


/*

MOVED TO imports/ui/todos/todos.js



*/ 
















