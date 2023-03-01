
const express = require('express');
const openai = require('../../middlewares/openai');
const axios = require('axios');
let app = express.Router()

// input tokens: 150
// input characters: 600
// output tokens: 50
// output characters: 200

// Personal Tools
app.post('/writing/email', async (req, res, next) => {
	try {
		let { tone, audience, desc, } = req.body

		if(desc){
			if (desc.length > 600) {
				desc = desc.substring(desc.length - 600)
			}
		}

		let prompt = `Write an email based on the metadata provided:\n"""\n` 

		

		

		let inputRaw =
		`${audience ? `RECIPIENT: ${audience}\n` : ``}` + 
		`${tone ? `TONE: ${tone}\n` : ``}` + 
		`${desc ? `DESCRIPTION: ${desc}\n` : ``}` + 
		`EMAIL:` 


		prompt += inputRaw


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

		console.log("output: "+gptResponse.data.choices[0].messages[0])

		let output = `${gptResponse.data.choices[0].text}`
		//console.log("output: "+output)
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