import React, { Component } from 'react';
import {
    PencilIcon,
    ClockIcon,
  } from '@heroicons/react/outline'

import  { Grid, Col } from '../Components/Body'
import EntryText  from '../Components/EntryText'
import Button from '../Components/Button'
import Output from '../Components/Output'
import Logo from '../Logo'
import Countdown from 'react-countdown';
import appStore from '../store';
import { observable, makeObservable } from 'mobx'
import { observer, inject,  } from 'mobx-react'
import "./css/Form.css"


@inject('store')
@observer
class EditProfile extends Component {

	countdown
	@observable output = ""
	@observable outputs = []
    @observable outputError = ""

	@observable option = "Start Using"
	@observable options= []
	@observable currentOption = ""

    @observable loading = false
	@observable date = Date.now() + 1000

	// Basic Input
	@observable prompt = ""
	@observable promptError = ""
    @observable promptNumber = 0

	// Options of Inputs
	@observable promptOptions = []

	// Currently Selected Input Option
	@observable currentPromptOption = ""

	// Multiple Input Option
	@observable prompts = []

	@observable feedbacks = []
    
    @observable tool = {}
    
    constructor(props) {
        super(props)
        makeObservable(this)
		console.log(this.props.store.profile)
		this.state = {
			firstName: this.props.store.profile.fname,
			lastName: this.props.store.profile.lname,
			companyName: this.props.store.profile.companyName,
			companyDescription: this.props.store.profile.companyDescription,
		  };
	  
		  this.handleSubmit = this.handleSubmit.bind(this);
		  this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
		  this.handleLastNameChange = this.handleLastNameChange.bind(this);
		  this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this);
		  this.handleCompanyDescriptionChange = this.handleCompanyDescriptionChange.bind(
			this
		  );
    }
	

	async handleSubmit(e) {
		e.preventDefault();
		console.log("submit")
		console.log(this.props.store.profile.email)
		await this.props.store.api.post('/auth/updateProfile', {
			email: this.props.store.profile.email,
			fname: this.state.firstName,
			lname: this.state.lastName,
			companyName: this.state.companyName,
			companyDescription: this.state.companyDescription
		})
		window.store = new appStore()
	  }
	
	  handleFirstNameChange(e) {
		this.setState({ firstName: e.target.value });
	  }
	
	  handleLastNameChange(e) {
		this.setState({ lastName: e.target.value });
	  }
	
	  handleCompanyNameChange(e) {
		this.setState({ companyName: e.target.value });
	  }
	
	  handleCompanyDescriptionChange(e) {
		this.setState({ companyDescription: e.target.value });
	  }

	
	render() {
		const {
			firstName,
			lastName,
			companyName,
			companyDescription,
		  } = this.state;
		return (
			<form onSubmit={this.handleSubmit} style={{width: "40%"}}>
			  <div className="form-row">
				<div className="form-group" style={{ marginRight: "50px" }}>
				  <label htmlFor="firstName">First Name:</label>
				  <input
					type="text"
					id="firstName"
					value={firstName}
					onChange={this.handleFirstNameChange}
					style={{ width: "100%", height: "40px" }}
				  />
				</div>
				<div className="form-group">
				  <label htmlFor="lastName">Last Name:</label>
				  <input
					type="text"
					id="lastName"
					value={lastName}
					onChange={this.handleLastNameChange}
					style={{ width: "100%", height: "40px" }}
				  />
				</div>
			  </div>
			  <div className="form-group">
				<label htmlFor="companyName">Company Name:</label>
				<input
				  type="text"
				  id="companyName"
				  value={companyName}
				  onChange={this.handleCompanyNameChange}
				  style={{ width: "100%", height: "40px" }}
				/>
			  </div>
			  <div className="form-group">
				<label htmlFor="companyDescription">Company Description:</label>
				<textarea
				  id="companyDescription"
				  value={companyDescription}
				  onChange={this.handleCompanyDescriptionChange}
				  style={{ width: "100%", height: "200px" }}
				></textarea>
			  </div>
			  <Button type="submit" onClick={this.handleSubmit}>Update Profile</Button>
			</form>
		  );
	}
}

  


export default EditProfile