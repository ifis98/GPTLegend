import {
	MenuAlt2Icon,
} from '@heroicons/react/solid'


const obj = {

	title: "Facebook Post Writer",
	desc: "Write a Facebook post",
	category: "Social",
	Icon: MenuAlt2Icon,
	// tags: [],
	permissions: ['user'],
	
	fromColor: "yellow-400",
	toColor: "yellow-600",

	to: "/ai/social/facebook",
	api: "/ai/social/facebook",

	output: {
		title: "Email",
		desc: "The following email has been generated",
		// Icon: RefreshIcon,
		// color: "",
	},

	prompts: [{
		title:"Write a Facebook post",
		desc: "Enter details about the post you want to write",
		// n: 1,
		prompts: [
			{ 
				title: "Topic", 
				attr: "topic",  
				value: "", 
				placeholder: "Global Warming", 
				label: "What is this post about?",
				// type: "textarea",
				maxLength: 50,
				// max: 100,
				// min: 5,
				// required: true,
				error: "",
				example: "Technology, development",
			},
			{ 
				title: "Tone", 
				attr: "tone",  
				value: "", 
				placeholder: "Urgent", 
				label: "What is the tone of your post?",
				//type: "textarea",
				maxLength: 50,
				// max: 100,
				// min: 100,
				// required: true,
				error: "",
				example: "An article about why its important to use storybook to document your progress even when working without a javascript framework to help you understand what you are doing.",
			},
			{ 
				title: "Description", 
				attr: "desc",  
				value: "", 
				placeholder: "An email about a purchase order for...", 
				label: "Describe what you want in your post",
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
