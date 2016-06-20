Template.listUsers.helpers({
    'user': function(){
        // var currentList = this._id;
        // var currentUser = Meteor.userId();
        var users = Meteor.users.find({}, { "emails": 1, "_id": 0 });
        console.log(users);
        return users;

    }
});

Template.users.events({
/*
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
*/
});

