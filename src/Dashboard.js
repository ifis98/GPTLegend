import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { computed,  } from 'mobx'
import MainBody from './Components/Body'
import {Helmet} from "react-helmet";


import { observer, inject } from 'mobx-react'
@inject('store')
@observer
class Body extends Component {

	@computed get permissions() {
		return this.props.store.tools.filter(tool=>
			tool.permissions.some(r=> this.props.store.profile.permissions.includes(r))
		)
	}

	@computed get beta() {
		return this.permissions.filter(tool => tool.category === 'Beta')
	}


	@computed get personal() {
		return this.permissions.filter(tool => tool.category === 'Personal')
	}

	@computed get business() {
		return this.permissions.filter(tool => tool.category === 'Business')
	}

	@computed get social() {
		return this.permissions.filter(tool => tool.category === 'Social')
	}

	@computed get content() {
		return this.permissions.filter(tool => tool.category === 'Content')
	}

	@computed get programming() {
		return this.permissions.filter(tool => tool.category === 'Programming')
	}

	@computed get ideas() {
		return this.permissions.filter(tool => tool.category === 'Ideas')
	}

	render() {
	return (

		<>
			<Helmet>
				<title>{`Smqrter`}</title>
			</Helmet>
			<MainBody className="px-4 py-4 md:px-28 md:py-8 lg:py-12">

		

			{this.ideas.length ? <>
				<Title title="Business Ideas" />
				<Grid>
					{this.ideas.map((tool, index) => 
						<Tool 
							key={index}
							group={tool.category}
							title={tool.title} 
							to={tool.to} 
							Icon={tool.Icon} 
							desc={tool.desc} 
							fromColor={tool.fromColor} 
							toColor="white"
						/>)} 
				</Grid>
				<Divider />
			</> : null}

			{this.content.length ? <>
				<Title title="Written Content" />
				<Grid>
					{this.content.map((tool, index) => 
						<Tool 
							key={index}
							group={tool.category}
							title={tool.title} 
							to={tool.to} 
							Icon={tool.Icon} 
							desc={tool.desc} 
							fromColor="purple-500"
							toColor="purple-100"
						/>)} 
				</Grid>
				<Divider />
				</> : null}

			{this.business.length ? <>
				<Title title="Business" />
				<Grid>
					{this.business.map((tool, index) => 
						<Tool 
							key={index}
							group={tool.category}
							title={tool.title} 
							to={tool.to} 
							Icon={tool.Icon} 
							desc={tool.desc} 
							fromColor="blue-500"
							toColor="blue-100"
						/>)} 
				</Grid>
				<Divider />
			</> : null}

			{this.personal.length ? <>
				<Title title="Personal" />
				<Grid>
					{this.personal.map((tool, index) => 
						<Tool 
							key={index}
							group={tool.category}
							title={tool.title} 
							to={tool.to} 
							Icon={tool.Icon} 
							desc={tool.desc} 
							fromColor="pink-500" 
							toColor="pink-100"
						/>)} 
				</Grid>
				<Divider />
			</> : null}

			{this.social.length ? <>
				<Title title="Social Media" />
				<Grid>
					{this.social.map((tool, index) => 
						<Tool 
							key={index}
							group={tool.category}
							title={tool.title} 
							to={tool.to} 
							Icon={tool.Icon} 
							desc={tool.desc} 
							fromColor="yellow-500"
							toColor="yellow-100"
						/>)} 
				</Grid>
				<Divider />
			</> : null}
			{this.programming.length ? <>
				<Title title="Programming" />
				<Grid>
					{this.programming.map((tool, index) => 
						<Tool 
							key={index}
							group={tool.category}
							title={tool.title} 
							to={tool.to} 
							Icon={tool.Icon} 
							desc={tool.desc} 
							fromColor="green-500"
							toColor="green-100"
						/>)} 
				</Grid>
				<Divider />
			</> : null}

</MainBody>
</>)
}
  }

export const Divider = () => <div className="divide-y-2 divide-dashed divide-gray-300 py-8 md:py-12"> <div></div>
<div></div></div>

export const Title = ({ title }) => <h2 className="text-xl sm:text-2xl md:text-3xl text-white mb-4 md:mb-6">
{title}
</h2>

export const Grid = ({ children }) => <div className="grid grid-cols-1 gap-8 mt-4 lg:grid-cols-2 xl:grid-cols-3 ">{children}</div>

export const Tool = ({ Icon, title, desc, to, group, fromColor, toColor }) => <Link to={to || "/"} className="flex relative ">
	
	<div className={`bg-black flex-1 rounded-xl transition hover:shadow-md overflow-hidden md:max-w-1lg text-gray-500 cursor-pointer md:flex relative transform hover:scale-105  hover:text-black`}>
  <div className="p-4">
	<div className={`uppercase mb-2 tracking-wide text-sm text-transparent bg-clip-text bg-gradient-to-r from-${fromColor} to-${toColor} font-semibold leading-none`}>{group || "New"}</div>
	<div href="#" className="block text-lg xl:text-lg leading-tight font-medium text-white leading-none">{title}</div>
	<p className=" pr-1 text-sm text-gray-500">{desc} </p>
  </div>
</div>
</Link>



export default Body