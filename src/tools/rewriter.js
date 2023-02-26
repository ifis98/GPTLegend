import {
	MenuAlt2Icon,
} from '@heroicons/react/solid'


const obj = {

	title: "Content Re-Writer",
	desc: "Rewrite any content to make it better",
	category: "Content",
	Icon: MenuAlt2Icon,
	// tags: [],
	permissions: ['user'],
	
	fromColor: "yellow-400",
	toColor: "yellow-600",

	to: "/ai/writing/rewriter",
	api: "/ai/writing/rewriter",

	output: {
		title: "Email",
		desc: "The following email has been generated",
		// Icon: RefreshIcon,
		// color: "",
	},

	prompts: [{
		title:"Re-write your text",
		desc: "Enter details about the text that you want to re-write",
		// n: 1,
		prompts: [
			{ 
				title: "Type of text", 
				attr: "type",  
				value: "", 
				placeholder: "Email, Article Intro, Tweet, etc.", 
				label: "What kind of text is this?",
				// type: "textarea",
				maxLength: 50,
				// max: 100,
				// min: 5,
				// required: true,
				error: "",
				example: "Technology, development",
			},
			{ 
				title: "Text to Rewrite", 
				attr: "text",  
				value: "", 
				placeholder: "An email about a purchase order for...", 
				label: "Enter what you want to rewrite",
				type: "textarea",
				maxLength: 2000,
				// max: 100,
				// min: 100,
				// required: true,
				error: "",
				example: "An article about why its important to use storybook to document your progress even when working without a javascript framework to help you understand what you are doing.",
			},
			{ 
				title: "Re-writing instructions", 
				attr: "text",  
				value: "", 
				placeholder: "Make this text more friendly and concise", 
				label: "How do you want to re-write your text?",
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

