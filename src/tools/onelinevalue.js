import {
	ViewListIcon,
} from '@heroicons/react/solid'


const obj = {

	title: "One-Line Value Proposition",
	desc: "Create a simple, one-liner of your product's or feature's value proposition.",
	category: "Content",
	Icon: ViewListIcon,
	// tags: [],
	permissions: ['user'],
	
	fromColor: "gray-500",
	toColor: "gray-500",

	to: "/ai/writing/onelinevalue",
	api: "/ai/writing/onelinevalue",

	output: {
		title: "Example",
		desc: "The following key points detected",
		Icon: false,
		color: "blue",
	},

	prompts: [{
		title:"Create your one-liner",
		desc: "Enter details about your feature or product",
		// n: 1,
		prompts: [

			{ 
				title: "Product or Feature Description", 
				attr: "desc",  
				value: "", 
				placeholder: "A tool that simplifies email writing...", 
				label: "Describe your product or feature",
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

