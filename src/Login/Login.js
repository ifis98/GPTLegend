import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

import {
CheckIcon,
UserIcon,
LockClosedIcon ,
} from '@heroicons/react/outline'
import {
Switch,
Route,
withRouter , Redirect
} from "react-router-dom";
import {Helmet} from "react-helmet";
import { observable, makeObservable, } from 'mobx'

import { observer, inject } from 'mobx-react'
@inject('store')
@observer
class Login extends Component {

	
	@observable email = ""
	@observable password = ""
	@observable fname = ""
	@observable lname = ""
	@observable errorMessage = ""

	constructor(){
		super()
		makeObservable(this)
	}

	onChange = (val) => {
		this.currentPromptOption = val
		console.log(this.currentPromptOption)
	}

	onChangeAny = (val, attr) => {
		this[attr] = val
		this.errorMessage = ""
	}

	onLogin = async (e) => {
		try {
			e.preventDefault()
			let data = await this.props.store.api.post('/auth/signin', {
				email: this.email,
				password: this.password,
			}).then(({data}) => data)
			this.props.store.loginWithDataTokenAndProfile(data)
		} catch (err){
			console.log(err)
			console.log(err?.response?.data?.message)
			if(err?.response?.data?.message){
				this.errorMessage = err?.response?.data?.message
			}
		}
	}	

	
	

	onSignup = async (e) => {
		try {
			e.preventDefault()
			this.errorMessage = ""
			console.log('signup')
			let data = await this.props.store.api.post('/auth/signup', {
						email: this.email,
						password: this.password,
						fname: this.fname,
						lname: this.lname,
						referral: this.props.store.referral
					}).then(({data}) => data)
					console.log(`onSignup`,data)
			if(data.token && data.profile){
				this.props.store.loginWithDataTokenAndProfile(data)
			}
		} catch (err){
			console.log(err)
			console.log(err?.response?.data?.message)
			if(err?.response?.data?.message){
				this.errorMessage = err?.response?.data?.message
			}
		}
	}

	// Currently Selected Input Option

	render() {
	return (
		<>
			<Helmet>
				<title>{`Login - Smqrter`}</title>
			</Helmet>
			<div className="container mx-auto lg:px-4 py-4 min-h-screen flex flex-col md:items-center md:justify-center">

				<div className="text-center mb-6">
					<Logo />
					<div className="text-3xl md:text-5xl relative font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500 mb-4">Smqrter<span className="font-normal "> AI</span>
					</div>
				</div>
			<div className={`min-w-full md:min-w-0 bg-black rounded-xl shadow-xl transform transition-all  transition shadow-md hover:shadow-2xl focus:shadow-2xl w-1/2`}>
			<div className="align-bottom flex  transform transition-all sm:align-middle transition flex  ">
				<NavLink to="/login"  className={`flex-1 justify-center transition py-4 px-4 pr-8 rounded-t-md flex text-${this.props.location.pathname === "/login"  ? "white" : "white"} font-medium  bg-${this.props.location.pathname === "/login" ? "black" : "gray-600"} hover:bg-${this.props.location.pathname === "/login"  ? "gray-700" : "gray-500"} cursor-pointer`} >
						  <div className={`transition mr-4  flex-shrink-0 inline-flex items-center justify-center text-sm h-6 w-6 rounded-full bg-${this.props.location.pathname === "/login" ? "blue-300" : "gray-200"} text-${this.props.location.pathname === "/login" ? "green-600" : "gray-600"}`}>
							  <CheckIcon className={`transition h-4 w-4 text-${this.props.location.pathname === "/login" ? "blue-500" : "gray-400"}`} aria-hidden="true" />
						  </div>
						 Login
				  </NavLink>
				  <NavLink to="/signup"  className={`flex-1 justify-center transition py-4 px-4 pr-8 rounded-t-md flex text-${this.props.location.pathname === "/signup"  ? "white" : "white"} font-medium  bg-${this.props.location.pathname === "/signup" ? "black" : "gray-600"} hover:bg-${this.props.location.pathname === "/signup"  ? "gray-700" : "gray-500"} cursor-pointer`} >
						  <div className={`transition mr-4  flex-shrink-0 inline-flex items-center justify-center text-sm h-6 w-6 rounded-full bg-${this.props.location.pathname === "/signup" ? "pink-300" : "gray-200"} text-${this.props.location.pathname === "/signup" ? "green-600" : "gray-600"}`}>
							  <CheckIcon className={`transition h-4 w-4 text-${this.props.location.pathname === "/signup" ? "pink-500" : "gray-400"}`} aria-hidden="true" />
						  </div>
						 Signup
				  </NavLink>
			  </div>
              <div className="px-4 py-4 md:px-12 md:py-12">
				{/* Sorru */}
			  <Switch>
                  <Route path="/login" >
				  	<Logon 
					  landingPageUrl={this.props.store.landingPageUrl}
					  	email={this.email} 
						  password={this.password} 
						  signUp={this.signUpWithGoogle}
						  onChange={this.onChangeAny} 
					onLogin={this.onLogin}		 />
					</Route>
                  <Route path="/signup"  >
				  <Signup 
						email={this.email} 
						password={this.password} 
						fname={this.fname} 
						lname={this.lname} 
						onChange={this.onChangeAny}  
						onSignup={this.onSignup}
					/>
				  </Route>
				  <Route >
				  	<Redirect to="/login" />
					  </Route>
				</Switch>
				{this.errorMessage ? <div className="text-red-600 bg-red-50 rounded-md p-1 text-center mt-4">
				{this.errorMessage}
				</div> : null}
				</div>
				<a href={`https://www.open.ai/`} className="block text-center bg-gray-600 text-white text-sm p-3 rounded-b-lg hover:bg-gray-500 cursor-pointer">
					Back to landing page
				</a>
			</div>
		</div>
		</>)
		}
  }

  const Logon = observer(({ active, email, password, onChange, onLogin, landingPageUrl, signUp }) => {
	return (
	  <>
<form onSubmit={onLogin}>
              		<div className={`mx-auto flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-${(email && password) ? "blue" : "gray"}-300  ${(email && password) ? "bg-green-300" : "bg-gray-300"} `}>
			  		<LockClosedIcon className={`h-8 w-8 ${active ? "text-green-700" : "text-gray-500"} text-${(email && password) ? "blue-700" : "gray-500"}`} aria-hidden="true" />
                </div>
               	 <div className="mt-3 text-center ">
                    <div className="text-3xl font-medium text-white">
                    	Log in
                    </div>
					<p className="text-lg text-gray-500">
					Login to your account
					</p>
					<div className="flex flex-col flex-1">
						<label className="text-gray-400 text-sm block mt-4 inline-block text-left">Email Address</label>
						<input value={email} onChange={e=>onChange(e.target.value,'email')} focus="true" type="email" className="rounded-md text-lg text-white px-4 py-2 bg-black border border-gray-300 " placeholder="john@smith.com" />
					</div>
					<div className="flex flex-col flex-1">
						<label className="text-gray-400 text-sm block mt-4 inline-block text-left">Password</label>
						<input value={password} onChange={e=>onChange(e.target.value,'password')} type="password" className="rounded-md text-lg px-4 py-2 bg-black text-white border border-gray-300 inline-block" placeholder="*******" />
					</div>
					<div className="flex flex-col">
						<button type="submit" className="hover:bg-blue-600 font-medium rounded-lg text-lg px-4 py-2 bg-blue-500 text-blue-100 mt-4 border border-blue-300 inline-block" >
							Log in
						</button>
						{/* <div onClick={signUp} className="hover:bg-gray-600 font-medium rounded-lg text-lg px-4 py-2 bg-gray-500 text-white mt-4 border border-gray-300 inline-block" >
						signUp Google
						</div>
						 */}
						<a href={`https://www.openaitemplate.ai/contact`} className="mt-4 text-gray-400 text-sm">Forgot your password?</a>
					</div>
                    </div>
                  </form>
	  </>
	)
  })

  const Signup = observer(({ active, email, password, fname, lname, onChange, onSignup }) => {
	return (
	  <>
	  {/* onSignup */}
<form onSubmit={onSignup}>
              		<div className={`mx-auto flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-${email && password ? "pink" : "gray"}-300  ${email && password ? "bg-green-300" : "bg-gray-300"} `}>
			  		<UserIcon className={`h-8 w-8 ${active ? "text-green-700" : "text-gray-500"} text-${email && password ? "pink-700" : "gray-500"}`} aria-hidden="true" />
                </div>
               	 <div className="mt-3 text-center ">
                    <div className="text-3xl font-medium text-white">
                    	Sign Up
                    </div>
					<p className="text-lg text-gray-500">
					Create your account
					</p>
					<div className="md:flex">
						<div className="flex flex-col min-w-0 md:pr-2 flex-1">
							<label className="text-gray-400 text-sm block mt-4 inline-block text-left">First Name</label>
							<input value={fname} onChange={e=>onChange(e.target.value,'fname')} type="text" className="rounded-md text-lg px-4 py-2 bg-black text-white border border-gray-300 inline-block w-auto" placeholder="John" />
						</div>
						<div className="flex flex-col min-w-0 md:pl-2 flex-1">
							<label className="text-gray-400 text-sm block mt-4 inline-block text-left">Last Name</label>
							<input value={lname} onChange={e=>onChange(e.target.value,'lname')} type="text" className="rounded-md text-lg px-4 py-2 bg-black text-white border border-gray-300 inline-block w-auto" placeholder="Smith" />
						</div>
					</div>
					<div className="flex flex-col">
						<label className="text-gray-400 text-sm block mt-4 inline-block text-left">Email Address</label>
						<input value={email} onChange={e=>onChange(e.target.value,'email')} focus="true" type="email" className="rounded-md text-lg px-4 py-2 bg-black text-white border border-gray-300 " placeholder="john@smith.com" />
					</div>
					<div className="flex flex-col">
						<label className="text-gray-400 text-sm block mt-4 inline-block text-left">Password</label>
						<input value={password} onChange={e=>onChange(e.target.value,'password')} type="password" className="rounded-md text-lg px-4 py-2 bg-black text-white border border-gray-300 inline-block" placeholder="*******" />
					</div>
					
					<div className="flex flex-col">
						<button type="submit"  className="hover:bg-pink-600 bg-pink-500 font-medium rounded-lg text-lg px-4 py-2 bg-gray-200 text-pink-100 mt-4 border border-pink-300 inline-block" >
							Sign Up
						</button>
					</div>
                    </div>
                  </form>
	  </>
	)
  })


  const Logo = () => (
	<svg
	xmlns="http://www.w3.org/2000/svg"
	fill="none"
	className="w-20 h-20 inline-block"
	viewBox="0 0 1512 1532"
  >
	<defs>
    	<linearGradient id="logoGradient">
			<stop offset="0%" stopColor="#EC407A" />
      		<stop offset="100%" stopColor="#2196F3" />
    	</linearGradient>
 	 </defs>
	<path
	  fill = "url(#logoGradient)"
	  d="M1412.22 627.024a381.628 381.628 0 0017.47-160.247 381.625 381.625 0 00-50.27-153.158 385.877 385.877 0 00-177.63-160.359 385.89 385.89 0 00-238.016-24.803A381.525 381.525 0 00833.74 33.209 381.565 381.565 0 00675.978.154a385.936 385.936 0 00-368.15 267.204A381.68 381.68 0 0052.672 452.459 385.97 385.97 0 002.636 686.458a385.954 385.954 0 0097.504 218.517 381.566 381.566 0 0032.793 313.405 385.943 385.943 0 00415.649 185.16 381.574 381.574 0 00287.797 128.31 385.89 385.89 0 00227.731-73.63 385.855 385.855 0 00140.54-193.73 381.572 381.572 0 00147.58-64.98c44-31.92 80.68-72.88 107.58-120.12a386.032 386.032 0 0049.92-233.94 385.967 385.967 0 00-97.51-218.426zM836.501 1431.71a286.188 286.188 0 01-183.744-66.43c2.325-1.26 6.403-3.5 9.061-5.13l304.978-176.16a49.595 49.595 0 0025.062-43.39V710.636l128.912 74.434c.67.337 1.25.834 1.69 1.451.44.616.72 1.333.81 2.079v356.07a287.37 287.37 0 01-84.08 202.77 287.387 287.387 0 01-202.689 84.27zm-616.724-263.39a286.085 286.085 0 01-34.242-192.354c2.264 1.36 6.22 3.776 9.059 5.407l304.977 176.157a49.582 49.582 0 0025.051 6.79c8.8 0 17.447-2.34 25.048-6.79l372.346-214.989v148.869c.042.76-.103 1.52-.425 2.21a4.548 4.548 0 01-1.417 1.74l-308.302 178.01a287.314 287.314 0 01-217.77 28.55 287.33 287.33 0 01-174.325-133.6zm-80.231-665.797a285.999 285.999 0 01149.41-125.856c0 2.627-.151 7.279-.151 10.507v352.327a49.55 49.55 0 0025.033 43.363l372.345 214.967-128.904 74.429c-.636.42-1.368.67-2.126.74a4.702 4.702 0 01-2.225-.34l-308.33-178.161a287.348 287.348 0 01-105.052-391.976zm1059.094 246.46L826.292 533.988l128.909-74.402a4.596 4.596 0 014.346-.391l308.333 178.004a287.1 287.1 0 01142.45 273.103 287.09 287.09 0 01-57.78 149.628 287.044 287.044 0 01-129.03 95.28V792.345a49.468 49.468 0 00-6.57-25.051 49.515 49.515 0 00-18.31-18.311zm128.3-193.103c-2.26-1.39-6.22-3.775-9.05-5.403L1012.9 374.312a49.683 49.683 0 00-50.09 0L590.463 589.31V440.443a4.613 4.613 0 011.842-3.955l308.302-177.857a287.08 287.08 0 01155.713-38.117 287.052 287.052 0 01151.87 51.322 287.09 287.09 0 01100.67 124.758 286.994 286.994 0 0118.08 159.286zM520.38 821.214l-128.939-74.433a4.572 4.572 0 01-2.505-3.535V387.174a287.084 287.084 0 0144.883-153.942 287.095 287.095 0 01120.453-105.853 287.069 287.069 0 01305.419 39.366c-2.324 1.268-6.372 3.503-9.06 5.134L545.653 348.042a49.548 49.548 0 00-25.063 43.36l-.21 429.812zm70.022-150.98l165.838-95.782 165.834 95.72v191.502L756.24 957.398l-165.838-95.724v-191.44z"
	></path>
  </svg>
	
)



export default withRouter(Login)