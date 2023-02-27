
const express = require('express');
const openai = require('../middlewares/openai');

let app = express.Router()

app.post('/business/salesfunnel', async (req, res, next) => {
	try {
		let { product, specialins, company, companyDescription } = req.body
  
	let prompt = `Write a detailed sales funnel with the following information:\n`

	let inputRaw = `PRODUCT DESCRIPTION:${product}\nCOMPANY NAME:${company}\nCOMPANY DESCRIPTION:${companyDescription}\nSPECIAL INSTRUCTIONS:${specialins}\nSALES FUNNEL:` // here is where people enter stuff
	prompt += inputRaw

	const gptResponse = await openai.complete({
		engine: 'text-davinci-003',
		prompt,
		maxTokens: 1000,
		temperature: 0.2,
		topP: 1,
		frequencyPenalty: 1,
		presencePenalty: 0,
		bestOf: 1,
		n: 1,
		user: req.user._id,
		stream: false,
		stop: ["###", "<|endoftext|>","SALES FUNNEL", "PRODUCT" ],
	});
	console.log(gptResponse)
	let output = `${gptResponse.data.choices[0].text}`
	console.log(output)

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

	} catch (err){
		console.log(err.response)
		console.log(err.data)
		console.log(err.message)
	}
	
  })

module.exports = app