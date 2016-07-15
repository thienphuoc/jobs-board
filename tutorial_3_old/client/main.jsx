import 	React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { mount } from 'react-mounter';

import App from '../imports/ui/App.jsx';

FlowRouter.route('/',{
	name: 'home',
	action(){
		mount(MainLayout , {content:(<BlogHome/>)});
	}
});

FlowRouter.route('/xxxx',{
	name: 'phuoc',
	action(){
		mount(MainLayoutContent , {content:(<App/>) });
	}
});