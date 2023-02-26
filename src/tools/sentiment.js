import {
	MenuAlt2Icon,
} from '@heroicons/react/solid'


const obj = {

	title: "Sentiment Analyzer",
	desc: "Analyze the tone and mood of your text",
	category: "Content",
	Icon: MenuAlt2Icon,
	// tags: [],
	permissions: ['user'],
	
	fromColor: "yellow-400",
	toColor: "yellow-600",

	to: "/ai/writing/sentiment",
	api: "/ai/writing/sentiment",

	output: {
		title: "Email",
		desc: "The following email has been generated",
		// Icon: RefreshIcon,
		// color: "",
	},

	prompts: [{
		title:"Analyze the Sentiment",
		desc: "Enter the text you want to analyze",
		// n: 1,
		prompts: [
			{ 
				title: "Text to Analyze", 
				attr: "text",  
				value: "", 
				placeholder: "An email about a purchase order for...", 
				label: "",
				type: "textarea",
				maxLength: 2000,
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

