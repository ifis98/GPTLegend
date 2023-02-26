import {
	ViewListIcon,
} from '@heroicons/react/solid'


const obj = {

	title: "Feature Ideas",
	desc: "Brainstorm features for your product!",
	category: "Business",
	Icon: ViewListIcon,
	// tags: [],
	permissions: ['user'],
	
	fromColor: "gray-500",
	toColor: "gray-500",

	to: "/ai/ideas/step1",
	api: "/ai/ideas/problems",

	output: {
		title: "Example",
		desc: "The following key points detected",
		Icon: false,
		color: "blue",
	},

	prompts: [{
		title:"Find feature ideas",
		desc: "Enter details about your feature",
		// n: 1,
		prompts: [

			{ 
				title: "Feature Requirements", 
				attr: "reqs",  
				value: "", 
				placeholder: "Must work with a platform that...", 
				label: "Describe your feature requirements?",
				type: "textarea",
				maxLength: 600,
				// max: 100,
				min: 0,
				required: true,
				error: "",
				example: "Hello World ",
			},
			{ 
				title: "Examples (optional)", 
				attr: "examples",  
				value: "", 
				placeholder: "A graph that shows height progression, ", 
				label: "Provide examples of features that meet the requirements",
				type: "textarea",
				maxLength: 600,
				// max: 100,
				min: 0,
				required: false,
				error: "",
				example: "Hello World ",
			},

		],
		example: {
			output: "Hello World Hello World Hello World Hello World Hello World Hello World Hello World ",
			// outputs: [
			// 	"The sun is very old, over 4.5 billion years",
			// 	"At 10,000 degrees, sun is also very hot",
			// 	"Gasses called coronal mass ejections erupt from the sun",
			// ],
			// Icon: RefreshIcon,
			color: "blue",
		}
	}]
		
}

export default obj

