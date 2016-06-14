Template.register.events({
    'submit form': function(event){
    	event.preventDefault();
    }
});

Template.login.events({
    'submit form': function(event){
    	event.preventDefault();
    }
});


if(Meteor.isClient){
	Template.login.onCreated(function(){
		// when the template is "assembled"

	});
	Template.login.onRendered(function(){
		// when the template is displayed
	    var validator = $('.login').validate({
	        submitHandler: function(event){
		        var email = $('[name=email]').val();
		        var password = $('[name=password]').val();
				Meteor.loginWithPassword(email, password, function(error){
					if(error){
					    if(error.reason == "User not found"){
					        validator.showErrors({
					            email: "That email doesn't belong to a registered user."   
					        });
					    }
					    if(error.reason == "Incorrect password"){
					        validator.showErrors({
					            password: "You entered an incorrect password."    
					        });
					    }
	                } else {
	                    var currentRoute = Router.current().route.getName();
	                    if(currentRoute == "login"){
	                        Router.go("home");
	                    }
	                }
				});
	        }
	    });
	});
	Template.login.onDestroyed(function(){
	    console.log("The 'login' template was just destroyed.");
	});

	Template.register.onRendered(function(){
	    var validator = $('.register').validate({
	    	submitHandler: function(event){
		        var email = $('[name=email]').val();
		        var password = $('[name=password]').val();
		        Accounts.createUser({
		            email: email,
		            password: password
		        }, function(error) {
					if(error){
					    if(error.reason == "Email already exists."){
					        validator.showErrors({
					            email: "That email already belongs to a registered user."   
					        });
					    }
					} else {
				        Router.go('home');
		        	}
		        });
	    	},
	    });
	});

	$.validator.setDefaults({
	    rules: {
	        email: {
	            required: true,
	            email: true
	        },
	        password: {
	            required: true,
	            minlength: 3
	        }
	    },
	    messages: {
	        email: {
	            required: "You must enter an email address.",
	            email: "You've entered an invalid email address."
	        },
	        password: {
	            required: "You must enter a password.",
	            minlength: "Your password must be at least {0} characters."
	        }
	    }
	});


}

if(Meteor.isServer){
    // server code goes here
}























