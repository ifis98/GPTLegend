import {
	MenuAlt2Icon,
} from '@heroicons/react/solid'


const obj = {

	title: "Daily Schedule",
	desc: "Create a schedule for today based on the task that you want to accomplish",
	category: "Personal",
	Icon: MenuAlt2Icon,
	// tags: [],
	permissions: ['user'],
	
	fromColor: "yellow-400",
	toColor: "yellow-600",

	to: "/ai/personal/taskscheduler",
	api: "/ai/personal/taskscheduler",

	output: {
		title: "Email",
		desc: "The following email has been generated",
		// Icon: RefreshIcon,
		// color: "",
	},

	prompts: [{
		title:"What you want to accomplish",
		desc: "Provide a short description about the tasks that you want to accomplish today",
		// n: 1,
		prompts: [
			{ 
				title: "Description", 
				attr: "desc",  
				value: "", 
				placeholder: "Drop off kids, go to the bank at 3 pm for an hour, etc.", 
				label: "Tasks you need to accomplish",
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

