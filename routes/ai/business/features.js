
const express = require('express');
const openai = require('../../middlewares/openai');

let app = express.Router()

// input tokens: 150
// input characters: 600
// output tokens: 50
// output characters: 200

// Personal Tools
app.post('/business/features', async (req, res, next) => {
	try {
		let { reqs, examples } = req.body


		let prompt = `Create feature ideas that meet the following requirements provided:\n"""\n` 

		

		

		let inputRaw =
		`${reqs ? `FEATURE REQUIREMENTS: ${reqs}\n` : ``}` + 
		`${examples ? `EXAMPLES OF FEATURES THAT MEET THE REQUIREMENTS: ${examples}\n` : ``}` + 
		`FEATURES:` 


		prompt += inputRaw


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

		// remove the first character from output
		output = output.substring(1, output.length)

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