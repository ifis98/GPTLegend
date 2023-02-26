
const express = require('express');
const openai = require('../../middlewares/openai');

let app = express.Router()

// input tokens: 150
// input characters: 600
// output tokens: 50
// output characters: 200

// Personal Tools
app.post('/personal/taskscheduler', async (req, res, next) => {
	try {
		let { desc, time} = req.body

		console.log(req.body)
		console.log(time)

		if(desc){
			if (desc.length > 600) {
				desc = desc.substring(desc.length - 600)
			}
		}

		let prompt = `Create a daily schedule based on the provided description of tasks to accomplish:\n"""\n` 

		

		

		let inputRaw = 
		`${desc ? `DESCRIPTION: ${desc}\n` : ``}` + 
		`CURRENT TIME: ${time}`
		`SCHEDULE:` 


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
			stop: [`"""`, "SCHEDULE:" ],
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