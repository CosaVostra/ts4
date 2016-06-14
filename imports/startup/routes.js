
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
    template: 'home',
});

Router.route('/list', {
    name: 'list',
    template: 'listPage',
    subscriptions: function(){
        return Meteor.subscribe('lists');
    }
});




Router.route('/list/:_id', {
    name: 'listPage',
    template: 'listPage',
    data: function(){
        var currentList = this.params._id;
        var currentUser = Meteor.userId();
        // var list = Lists.findOne({ _id: currentList, createdBy: currentUser });
        return Lists.findOne({ _id: currentList, createdBy: currentUser });;
        
        /* ATTENTION, SI UNE LISTE N'EXISTE PAS, AUCUN RETOUR */
        /* exemple : http://localhost:3000/list/123 */
    }, 
    onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next();
        } else {
            this.render("login");
        }
    },
    subscriptions: function(){
        var currentList = this.params._id;
        return [ Meteor.subscribe('lists'), Meteor.subscribe('todos', currentList) ]
    }
});



























