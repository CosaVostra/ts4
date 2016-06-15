import { Meteor } from 'meteor/meteor';

import './routes.js';

/* GENERAL */ 
import '../ui/general/register.html';
import '../ui/general/login.html';
import '../ui/general/loading.html';
import '../ui/general/general.js';

/* LAYOUT */
import '../ui/layout/header.html';
import '../ui/layout/home.html';
import '../ui/layout/main.html';
import '../ui/layout/layout.js';

/* TODOS */ 
// import '../ui/addtodo.html';
// import '../ui/todos.html';
// import '../ui/todoitem.html';
// import '../ui/todoscount.html';
import '../ui/listtodos.html';

/* LISTS */ 
// import '../ui/addlist.html';
// import '../ui/lists.html';
import '../ui/todos/listpage.html';

/* CLIENTS AND PROJECTS */ 
import '../ui/clients/addclients.html';
import '../ui/clients/addprojects.html';
import '../ui/clients/listprojects.html';
import '../ui/clients/listclients.html';
