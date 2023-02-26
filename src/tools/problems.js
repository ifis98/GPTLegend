import {
	ViewListIcon,
} from '@heroicons/react/solid'


const obj = {

	title: "Find a Problem",
	desc: "Fill out this questionnaire to find problems that you're positioned to solve!",
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
		title:"Problems Questionaire",
		desc: "Fill out the following survey.",
		// n: 1,
		prompts: [{ 
				title: "Age", 
				attr: "hobbies",  
				value: "", 
				placeholder: "How old are you?", 
				label: "",
				//type: "textarea",
				maxLength: 3,
				// max: 100,
				min: 0,
				required: true,
				error: "",
				example: "Hello World ",
			},
			{ 
				title: "What are your hobbies?", 
				attr: "age",  
				value: "", 
				placeholder: "Gaming, Sports, etc.", 
				label: "",
				type: "textarea",
				maxLength: 600,
				// max: 100,
				min: 0,
				required: true,
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

