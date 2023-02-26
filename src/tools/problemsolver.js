import {
	MenuAlt2Icon,
} from '@heroicons/react/solid'


const obj = {

	title: "Problem Solving Assistant",
	desc: "Receive steps to help you solve a problem:",
	category: "Personal",
	Icon: MenuAlt2Icon,
	// tags: [],
	permissions: ['user'],
	
	fromColor: "yellow-400",
	toColor: "yellow-600",

	to: "/ai/personal/email",
	api: "/ai/personal/email",

	output: {
		title: "Email",
		desc: "The following email has been generated",
		// Icon: RefreshIcon,
		// color: "",
	},

	prompts: [{
		title:"Problem Description",
		desc: "Provide a short description about the problem you're facing",
		// n: 1,
		prompts: [
			{ 
				title: "Description", 
				attr: "desc",  
				value: "", 
				placeholder: "I have been falling behind in work lately...", 
				label: "A short description about your problem",
				type: "textarea",
				maxLength: 600,
				// max: 100,
				// min: 100,
				// required: true,
				error: "",
				example: "An article about why its important to use storybook to document your progress even when working without a javascript framework to help you understand what you are doing.",
			},
		],
		example: {
			output: "Storybook is a development environment for UI components. It helps you iterate faster on UI code. It allows you to browse a component library, view the different states of each component, and interactively develop and test components.\n\nI believe in Storybook’s value, and I’m sure it will improve your workflow. But I’m also going to share with you a different approach that can help you save some time without using a JavaScript framework.",
			// outputs: [],
			// Icon: RefreshIcon,
			// color: "",
		}
	}]
		
}

export default obj

