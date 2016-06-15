import 	React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { mount } from 'react-mounter';

import App from '../imports/ui/App.jsx';


// Meteor.startup(()=>{
// 	render(<App />, document.getElementById('render-target'));
// });

FlowRouter.route('/',{
	action(){
		mount(MainLayout , {content:(<BlogHome/>)});
	}
});

FlowRouter.route('/xxxx',{
	name: 'phuoc',
	action(){
		mount(MainLayout , {content:(<App/>) });
	}
});