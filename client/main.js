import { Mongo } from 'meteor/mongo';

import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';

import { ReactiveVar } from 'meteor/reactive-var';

import '../imports/startup/index.js';


Todos = new Mongo.Collection('todos');

if(Meteor.isClient){
    // client code goes here
}

if(Meteor.isServer){
    // server code goes here
}

Template.todos.helpers({
    'todo': function(){
        return Todos.find({}, { sort: { createdAt : -1 }});
    }
});

Template.addTodo.events({
	'submit form': function(event){
	    event.preventDefault();
	    var todoName = $('[name="todoName"]').val();
	    Todos.insert({
	        name: todoName,
	        completed: false,
	        createdAt: new Date()
	    });
	    $('[name="todoName"]').val('');
	}
});

Template.todoItem.events({
	'click .delete-todo': function(event){
	    event.preventDefault();
	    var documentId = this._id;
	    var confirm = window.confirm("Delete this task?");
	    if (confirm) {
	    	Todos.remove({ _id: documentId });
	    }
	},
	'keyup [name=todoItem]': function(event){
	    console.log("1");
	}
});