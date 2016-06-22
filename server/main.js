import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Todos = new Mongo.Collection('todos');
Lists = new Mongo.Collection('lists');
Clients = new Mongo.Collection('clients');
Projects = new Mongo.Collection('projects');

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('lists', function(){
	var currentUser = this.userId;
    return Lists.find({ createdBy: currentUser });
}); 

Meteor.publish('todos', function(currentList){
    var currentUser = this.userId;
	return Todos.find({ createdBy: currentUser, listId: currentList })
});

Meteor.publish("users", function () {
	return Meteor.users.find({});
});

Meteor.publish('clients', function(){
	// var currentUser = this.userId;
    return Clients.find();
}); 

Meteor.publish('projects', function(currentClient){
	// var currentUser = this.userId;
	// return Projects.find({ clientId: currentClient });
	return Projects.find();
}); 


Meteor.methods({
// 
// LISTS AND TODOS METHODS 
// 
	'createNewList': function(listName){
		var currentUser = Meteor.userId();
		check(listName, String);
		if(listName == ""){
		    listName = defaultName(currentUser);
		}
		var data = {
			name: listName,
		    createdBy: currentUser,
		    createdAt: new Date(),
		}
		if(!currentUser){
        	throw new Meteor.Error("not-logged-in", "You're not logged-in");
    	}
    	return Lists.insert(data);
	},
	'createListItem': function(todoName, currentList){

	    check(todoName, String);
	    check(currentList, String);

	    var currentUser = Meteor.userId();
	    var data = {
	        name: todoName,
	        completed: false,
	        createdAt: new Date(),
	        createdBy: currentUser,
	        listId: currentList
	    }

	    if(!currentUser){
	        throw new Meteor.Error("not-logged-in", "You're not logged-in.");
	    }

	    var currentList = Lists.findOne(currentList);
	    if(currentList.createdBy != currentUser){
	        throw new Meteor.Error("invalid-user", "You don't own that list.");
	    }

	    return Todos.insert(data);
	},
	'updateListItem': function(documentId, todoItem){
	    check(todoItem, String);
	    var currentUser = Meteor.userId();
	    var data = {
	        _id: documentId,
	        createdBy: currentUser
	    }
	    if(!currentUser){
	        throw new Meteor.Error("not-logged-in", "You're not logged-in.");
	    }
	    Todos.update(data, {$set: { name: todoItem }});
	},
	'changeItemStatus': function(documentId, status){
	    check(status, Boolean);
	    var currentUser = Meteor.userId();
	    var data = {
	        _id: documentId,
	        createdBy: currentUser
	    }
	    if(!currentUser){
	        throw new Meteor.Error("not-logged-in", "You're not logged-in.");
	    }
	    Todos.update(data, {$set: { completed: status }});
	},
	'removeListItem': function(documentId){
	    var currentUser = Meteor.userId();
	    var data = {
	        _id: documentId,
	        createdBy: currentUser
	    }
	    if(!currentUser){
	        throw new Meteor.Error("not-logged-in", "You're not logged-in.");
	    }
	    Todos.remove(data);
	},
	'deleteList': function(documentId){
	    var currentUser = Meteor.userId();
	    var data = {
	        _id: documentId,
	        createdBy: currentUser
	    }
	    if(!currentUser){
	        throw new Meteor.Error("not-logged-in", "You're not logged-in.");
	    }
		Lists.remove(data);
	},
// 
// CLIENTS METHODS 
// 
	'createClient': function(clientName){
		var currentUser = Meteor.userId();
		check(clientName, String);
		if(clientName == ""){
		    clientName = "Acme";
		}
		var data = {
			name: clientName,
		    createdBy: currentUser,
		    createdAt: new Date(),
		}
		if(!currentUser){
        	throw new Meteor.Error("not-logged-in", "You're not logged-in");
    	}
    	return Clients.insert(data);
	},
	'updateClient': function(documentId, clientName){
	    check(clientName, String);
	    var currentUser = Meteor.userId();
	    var data = {
	        _id: documentId,
	        createdBy: currentUser
	    }
	    if(!currentUser){
	        throw new Meteor.Error("not-logged-in", "You're not logged-in.");
	    }
	    Clients.update(data, {$set: { name: clientName }});
	},
	'removeClient': function(documentId){
	    var currentUser = Meteor.userId();
	    var data = {
	        _id: documentId,
	        createdBy: currentUser
	    }
	    if(!currentUser){
	        throw new Meteor.Error("not-logged-in", "You're not logged-in.");
	    }
	    Clients.remove(data);
	},
// 
// PROJECTS METHODS 
// 
	'createProject': function(projectName, currentClient){

	    check(projectName, String);
	    check(currentClient, String);

	    var currentUser = Meteor.userId();
	    var data = {
	        name: projectName,
	        active: true,
	        createdAt: new Date(),
	        createdBy: currentUser,
	        clientId: currentClient
	    }

	    if(!currentUser){
	        throw new Meteor.Error("not-logged-in", "You're not logged-in.");
	    }

	    var currentClient = Clients.findOne(currentClient);
/* 	    if(currentList.createdBy != currentUser){
	        throw new Meteor.Error("invalid-user", "You don't own that list.");
	    }
*/
	    return Projects.insert(data);
	},
	/*
	'updateClient': function(documentId, clientName){
	    check(clientName, String);
	    var currentUser = Meteor.userId();
	    var data = {
	        _id: documentId,
	        createdBy: currentUser
	    }
	    if(!currentUser){
	        throw new Meteor.Error("not-logged-in", "You're not logged-in.");
	    }
	    Clients.update(data, {$set: { name: clientName }});
	},
	'removeClient': function(documentId){
	    var currentUser = Meteor.userId();
	    var data = {
	        _id: documentId,
	        createdBy: currentUser
	    }
	    if(!currentUser){
	        throw new Meteor.Error("not-logged-in", "You're not logged-in.");
	    }
	    Clients.remove(data);
	},
	*/
});

function defaultName(currentUser) {
    var nextLetter = 'A'
    var nextName = 'List ' + nextLetter;
    while (Lists.findOne({ name: nextName, createdBy: currentUser })) {
        nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
        nextName = 'List ' + nextLetter;
    }
    return nextName;
}