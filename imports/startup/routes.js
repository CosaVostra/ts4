
Router.configure({
    layoutTemplate: 'main'
});

Router.route('/register', {
    name: 'register',	
});

Router.route('/login', {
    name: 'login',	
});

Router.route('/', {
    name: 'home',
    template: 'home'
});

Router.route('/list/:_id', {
    template: 'listPage',
    data: function(){
        var currentList = this.params._id;
		return Lists.findOne({ _id: currentList });
    }
});