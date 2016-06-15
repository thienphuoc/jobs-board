import React, { Component, PropTypes } from 'react';

export default class Job extends React.Component {
	render(){
		return(
			<li>{this.props.job.status}</li>
		);
	}

}
