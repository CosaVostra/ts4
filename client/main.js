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

Template.todos.helpers({
    'todo': function(){
        var currentList = this._id;
        var currentUser = Meteor.userId();
        return Todos.find({ listId: currentList, createdBy: currentUser }, {sort: {createdAt: -1}})
    }
});

Template.addTodo.events({
	'submit form': function(event){
	    event.preventDefault();
	    var todoName = $('[name="todoName"]').val();
	    var currentList = this._id;
	    var currentUser = Meteor.userId();
	    Todos.insert({
	        name: todoName,
	        completed: false,
	        createdAt: new Date(),
	        createdBy: currentUser,
	        listId: currentList
	    });
	    $('[name="todoName"]').val('');
	},
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
	    if(event.which == 13 || event.which == 27){
			$(event.target).blur();
	    } else {
	        var documentId = this._id;
	        var todoItem = $(event.target).val();
	        Todos.update({ _id: documentId }, {$set: { name: todoItem }});
	    }
	},
	'change [type=checkbox]': function(){
		var documentId = this._id;
		var isCompleted = this.completed;
	    if(isCompleted){
	        Todos.update({ _id: documentId }, {$set: { completed: false }});
	        // console.log("Task marked as incomplete.");
	    } else {
	        Todos.update({ _id: documentId }, {$set: { completed: true }});
	        // console.log("Task marked as complete.");
	    }
	},
});

Template.todoItem.helpers({
    'checked': function(){
    	var isCompleted = this.completed;
        if(isCompleted){
            return "checked";
        } else {
            return "";
        }
    },
	/* ADDED LAURENT - DISPLAY LIST NAME */
   	/* 
    'listName': function(){    	
    	var listName = Lists.findOne({_id: this.listId});
    	console.log(listName);
    	return listName.name;
    } 
    */

});

Template.todosCount.helpers({
	'totalTodos': function(){
        var currentList = this._id;
        return Todos.find({ listId: currentList }).count();
	},
	'completedTodos': function(){
        var currentList = this._id;
        return Todos.find({ listId: currentList, completed: true }).count();
	}
});


Template.addList.events({
    'submit form': function(event){
      event.preventDefault();
      var listName = $('[name=listName]').val();
      var currentUser = Meteor.userId();
	  Lists.insert({
	      name: listName,
	      createdBy: currentUser
      }, function(error,results){
          Router.go('listPage', { _id: results });
      });
      $('[name=listName]').val('');
    }
});

Template.lists.helpers({
    'list': function(){
    	var currentUser = Meteor.userId();
        return Lists.find({ createdBy: currentUser }, {sort: {name: 1}});
    },/*
    'hasLists': function(){
    	if(Lists.find().count() > 0) {
    		return true
    	}
    }*/
});


Template.listPage.events({
	'click .delete-list': function(event){
	    event.preventDefault();
	    var documentId = this._id;
	    var countTasks = Todos.find({ listId: documentId }).count();
	    console.log(countTasks);
	    var confirm = window.confirm("Delete this list?");
	    if (confirm && countTasks == 0) {
	    	Lists.remove({ _id: documentId });
	    } else {
	    	alert("Couldn't remove this list - delete its tasks first.")
	    }
	},
});




















