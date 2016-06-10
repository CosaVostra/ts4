
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

Router.route('/list/', {
    name: 'list',
    template: 'home'
});

Router.route('/list/:_id', {
    name: 'listPage',
    template: 'listPage',
    data: function(){
        var currentList = this.params._id;
		return Lists.findOne({ _id: currentList });
        /* ATTENTION, SI UNE LISTE N'EXISTE PAS, AUCUN RETOUR */
        /* exemple : http://localhost:3000/list/123 */
    }
});