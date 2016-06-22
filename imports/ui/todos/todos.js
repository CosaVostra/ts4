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
	    Meteor.call('createListItem', todoName, currentList, function(error){
	        if(error){
	            console.log(error.reason);
	        } else {
	            $('[name="todoName"]').val('');
	        }
	    });

	},
});

Template.todoItem.events({
	'click .delete-todo': function(event){
	    event.preventDefault();
	    var documentId = this._id;
	    var confirm = window.confirm("Delete this task?");
	    if(confirm){
	        Meteor.call('removeListItem', documentId);
	    }
	},
	'keyup [name=todoItem]': function(event){
	    if(event.which == 13 || event.which == 27){
	        $(event.target).blur();
	    } else {
	        var documentId = this._id;
	        var todoItem = $(event.target).val();
	        Meteor.call('updateListItem', documentId, todoItem);
	    }
	},
	'change [type=checkbox]': function(){
	    var documentId = this._id;
	    var isCompleted = this.completed;
	    if(isCompleted){
	        Meteor.call('changeItemStatus', documentId, false);
	    } else {
	        Meteor.call('changeItemStatus', documentId, true);
	    }
	}
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
        Meteor.call('createNewList', listName, function(error, results){
	        if(error){
	            console.log(error.reason);
	        } else {
	            Router.go('listPage', { _id: results });
	            $('[name=listName]').val('');
	        }
        });
    }
});

Template.lists.helpers({
    'list': function(){
    	var currentUser = Meteor.userId();
        return Lists.find({ createdBy: currentUser }, {sort: {createdAt: 1}});
    },
    /*
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
	    var confirm = window.confirm("Delete this list?");
	    if (confirm && countTasks == 0) {
	        Meteor.call('deleteList', documentId, function(error, results){
		        if(error){
		            console.log(error.reason);
		        } else {
		            Router.go('list');
		            $('[name=listName]').val('');
		        }
	        });
	    } else {
	    	alert("Couldn't remove this list - delete its tasks first.")
	    }
	},
});



















