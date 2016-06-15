import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Job from './Job.jsx';
import AppBar from 'material-ui/lib/app-bar';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Paper from 'material-ui/lib/paper';
import {deepOrange500} from 'material-ui/lib/styles/colors';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Colors from 'material-ui/lib/styles/colors';
import FontIcon from 'material-ui/lib/font-icon';


///////////
import "/jobs.js";

const style = {
  height: 100,
  width: 200,
  margin: 0,
  textAlign: 'left-nav',
  display: 'inline-block',
};

export default class App extends React.Component {


 /*
  * Constructor....
  */
  constructor(props,context) {
    super(props,context);
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      open: false,
    };
  }

 /*
  * submit event search.....
  */
	handleSubmit(event){
		event.preventDefault();
		var text = this.refs.myField.getValue();
    Session.set("searchValue",text);
	}

 /*
  * Render jobs.....
  */
	renderJobs(){
		return this.props.jobs.map((job)=>(
		 <Job key={job._id} job={job} />
		));
	}

 /*
  * Navigation drawer.....
  */

  handleToggle(){
		this.setState({
			open: !this.state.open
		,});
	}
 /*
  * UI App.....
  */
	render(){
		return(
				<div className="container">
	     				 	<AppBar
  								title="Title"
  								iconClassNameRight="muidocs-icon-navigation-expand-more"
  								onLeftIconButtonTouchTap = {this.handleToggle}
  							 />
                
                <TextField 
                      ref="myField"  
                      onChange={this.handleSubmit.bind(this)}
                      onEnterKeyDown={this.handleSubmit.bind(this)}  
                      hintText="Nhap tu khoa tim kiem..." 
                      floatingLabelText="Tim nao !"/>

  						  <RaisedButton 
                      label="Search" 
                      primary={true} 
                      onTouchTap={this.handleSubmit.bind(this)}/>


								<LeftNav
    				          docked={false}
    				          width={200}
    				          open={this.state.open}
    				          onRequestChange={open => this.setState({open})}>

								  <Paper style={style} zDepth={1}/>
				          <MenuItem onTouchTap={this.handleClose}>Menu Item</MenuItem>
				          <MenuItem onTouchTap={this.handleClose}>Menu Item 2</MenuItem>
				        
                </LeftNav>

        				<ul>
        				{this.renderJobs()}
        				</ul>
				</div>

			);
	}
}

App.propTypes = {
  jobs: PropTypes.array.isRequired,
};


export default createContainer(() => {
  if (Meteor.isClient){
    Meteor.subscribe('search', Session.get("searchValue"));
     if (Session.get("searchValue")) {
       return {
         jobs: Jobs.find({}, { sort: { createdAt: -1}}).fetch(),
       };
     }
     else {
        return {
          jobs: Jobs.find({}).fetch(),
      };
      }
  }

}, App);


const stylePaperHome = {
    textAlign: 'center',
    backgroundColor: Colors.orange500,
    color:Colors.orange50,
    height:"100%",
    fontSize: "20px"
  };

const styleMain = {
    backgroundColor: Colors.orange500,
    position: "absolute",
    backgroundAttachment: "fixed",
    top: 0,
      bottom: 0,
      left: 0,
      height:"100%",
      right: 0
  };

const styleButton = {
  fullWidth: false
  };


MainLayout = React.createClass({
  render() {
    return <main style={styleMain} >{this.props.content}</main>
  }
});

BlogHome = React.createClass({

  goTo() {
    FlowRouter.go('phuoc')
  },
  render() {
  return <Paper style={stylePaperHome} zDepth={3}>
    <h2 >This is the asdasdsa page of our blog</h2>
    <img src="logo1.png" />
    <p>
      <RaisedButton label="Login" style={styleButton}
    icon={<FontIcon className="muidocs-icon-custom-github"/>}
      primary={true} onClick={this.goTo}> </RaisedButton>
    </p>
    <h2 >This is the home page of our blog</h2>
  </Paper>;
  }
});

BlogPost = React.createClass({
  render() {
    return <div>
      <p>
        <a href="/">Back</a> <br/>
        This is a single blog post
      </p>
    </div>;
  }
});