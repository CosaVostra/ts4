import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Todos = new Mongo.Collection('todos');
Lists = new Mongo.Collection('lists');

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