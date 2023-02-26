
const express = require('express');
const openai = require('../../middlewares/openai');

let app = express.Router()

app.post('/code/interpret', async (req, res, next) => {

	try {
			let { language, content, } = req.body

			let prompt = `### Interpret code blocks and explain what they do in simple. helpful terms with the provided language in list format:\n\n` 


			let inputRaw = `# Code\n` + 
			`${content}\n#\n` +
			`LANGUAGE: ${language}\n` +

			`EXPLANATION OF WHAT THE CODE DOES:\n1.`

			prompt += inputRaw

			const gptResponse = await openai.complete({
				engine: 'code-davinci-002',
				prompt,
				maxTokens: 100,
				temperature: 0.5,
				topP: 1,
				frequencyPenalty: 0,
				presencePenalty: 0,
				bestOf: 1,
				user: req.user._id,
				stream: false,
				stop: ['# Code','# Explanation', "<|endoftext|>" ],
			});

			// let output = `${gptResponse.data.choices[0].text}`

			let outputs = []

			if(gptResponse.data.choices[0].text){
				// Split break lines
				outputs = `1.${gptResponse.data.choices[0].text}`.split('\n')
		
				// remove entries with spaces or empty
				outputs = outputs.filter(function(output) {
					return (!(output === "" || output === " " || output === "\n"))
				})
		
				// remove numbers and spaces
				for (let i = 0; i < outputs.length; i++) {
					outputs[i] = outputs[i].substring(3)
					outputs[i] = outputs[i].replace(/^\s+|\s+$/g, '')
				}
				// remove duplicates
				outputs = outputs.filter((item, pos, self) => self.indexOf(item) === pos)
			}

			req.locals.input = prompt
			req.locals.inputRaw = inputRaw
			req.locals.outputs = outputs

			next();

		} catch(err){
			console.log(err)
		}
	
  })

module.exports = app