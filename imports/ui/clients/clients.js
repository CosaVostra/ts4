Template.clients.helpers({
    'client': function(){ 
        return Clients.find({}, {sort: {createdAt: 1}});
    },
});

Template.addClient.events({
    'submit form': function(event){
        event.preventDefault();
        var clientName = $('[name=clientName]').val();
        Meteor.call('createClient', clientName, function(error, results){
	        if(error){
	            console.log(error.reason);
	        } else {
	            Router.go('clients', { _id: results });
	            $('[name=clientName]').val('');
	        }
        });
    }
});


Template.addProject.events({
	'submit form': function(event){
	    event.preventDefault();
	    var projectName = $('[name="projectName"]').val();
	    var currentClient = this._id;
	    Meteor.call('createProject', projectName, currentClient, function(error){
	        if(error){
	            console.log(error.reason);
	        } else {
	            $('[name="projectName"]').val('');
	        }
	    });
	},
});


Template.clientProjects.helpers({
    'project': function(){
        var currentClient = this._id;
        // var projects = Projects.find({ clientId: currentClient }, {sort: {createdAt: -1}});
        return Projects.find();
    }
});


Template.projectItem.helpers({
    'checked': function(){
    	var isActive = this.active;
        if(isActive){
            return "checked";
        } else {
            return "";
        }
    },
});
/*
Template.projectItem.event({
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
*/

