
const express = require('express');
const openai = require('../../middlewares/openai');

let app = express.Router()

// input tokens: 150
// input characters: 600
// output tokens: 50
// output characters: 200

// Personal Tools
app.post('/writing/onelinevalue', async (req, res, next) => {
	try {
		let {desc} = req.body



		let prompt = `Write a catchy one-liner made by an expert marketer that simply explains the value proposition of my product or feature to a potential buyer:\n"""\n` 

		

		

		let inputRaw =
		`${desc ? `PRODUCT OR FEATURE DESCRIPTION: ${desc}\n` : ``}` + 
		`ONE-LINER:` 


		prompt += inputRaw

		/*
		const gptResponse = await openai.complete({
			engine: 'text-davinci-003',
			prompt,
			maxTokens: 500,
			temperature: 0.8,
			frequencyPenalty: 0.2,
			presencePenalty: 0,
			bestOf: 1,
			topP: 1,
			n: 1,
			user: req.user._id,
			stream: false,
			stop: [`"""`, "Title:","Audience:", "Introduction:" ],
		});

		let output = `${gptResponse.data.choices[0].text}`
		*/

		const gptResponse = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages:[{role:"user",content:prompt}],
			/*
			maxTokens: 500,
			temperature: 0.8,
			frequencyPenalty: 0.2,
			presencePenalty: 0,
			bestOf: 1,
			topP: 1,
			n: 1,
			user: req.user._id,
			stream: false,
			stop: [`"""`, "Title:","Audience:", "Introduction:" ],
			*/
		});

		//console.log("output: "+gptResponse.data.choices[0].message)

		let output = `${gptResponse.data.choices[0].message.content}`
		// remove the first character from output
		output = output.substring(0, output.length)

		// If the output string ends with one or more hashtags, remove all of them
		if (output.endsWith('"')) {
			output = output.substring(0, output.length - 1)
		}

		// If the output string ends with one or more hashtags, remove all of them
		if (output.endsWith('"')) {
			output = output.substring(0, output.length - 1)
		}

		// remove a single new line at the end of output if there is one
		if (output.endsWith('\n')) {
			output = output.substring(0, output.length - 1)
		}
	
		req.locals.input = prompt
		req.locals.inputRaw = inputRaw
		req.locals.output = output

		next()

	} catch (err) {
		console.log(err)
	}
  })

  module.exports = app