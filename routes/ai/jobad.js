
const express = require('express');
const openai = require('../middlewares/openai');

let app = express.Router()

// input tokens: 150
// input characters: 600
// output tokens: 50
// output characters: 200

app.post('/business/jobad', async (req, res, next) => {
	let { content, currentPrompt, title, salary, skills, company, companyDescription, contact } = req.body
  
	let prompt = ""
	let inputRaw = ""

	if(currentPrompt === "Basic Ad"){
		prompt = `Create a detailed Job Ad from the text:\n###\n` +
	  `TEXT: moshi marketing agency position $40k web developer knows lots of front end, html, react, etc can work alone\nJOB AD:\nMoshi is looking for a candidate to join our exciting Marketing Agency working programming on the front end. If you are looking for a Front End position, you will get the chance to build websites designed by our amazing team on platforms such as WordPress, Shopify and more.\n\nThe Role:\n- Create Websites using latest coding standards\n- Use technology stacks such as React, Angular, Vue \n- Work on small and large projects with a team\n\nTechnical Requirements:\n- Understanding in HTML, CSS, JS\n- Experience in libraries like React & TypeScript\n- Experience in Azure or AWS\n\nHow to apply:\nIf you are interested, you can apply by contacting us directly at Moshi.\n###\n` +
	  `TEXT: smiths & co leadership job for a financial planner manager that helps with budgets, liases with managers, helps the ceo, is local in australia. contact is james@s.com\nJOB AD:\nWell established in the Australian financial industry, Smith & Co has seen significate internal movement and revenue growth over the past year and is looking to bring on an develop top talent. This is a career building opportunity for an experience candidate seeking progression.\n\nThe Role:\n- Report directly to the Chief Financial Officer\n- Drive the budgeting and forecasting process\n- Liaise with Business Unit Managers to drive process improvements\n- Work with the Executive team to develop a balanced scorecard\n- Review existing systems and recommend changes\n\nSkills and Experience:\n- Proven Experience in a senior finance role\n- Ability to develop meaningful FP&P reporting and detailed analysis\n- Experience in the retail industry would be an advantage\n\nHow to apply:\nDoes this sound like you? Please apply now below by contacting us at Smiths & Co or email james@s.com\n###\n`

	  inputRaw = `TEXT: ${content}\nJOB AD:\n`
	  prompt += inputRaw
	  
	}
  
	if(currentPrompt === "Detailed Ad"){
		prompt = `As a recruiter, create a detailed Job Ad from the following details:\n###` 

	  inputRaw = `TITLE: ${title}\nSALARY: ${salary}\nSKILLS: ${skills}\nCOMPANY NAME: ${company}\nCONTACT: ${contact}\n COMPANY DESCRIPTION:${companyDescription} JOB AD:`
	  prompt += inputRaw
	}
  
	
  /*
	const gptResponse = await openai.complete({
		engine: 'text-davinci-003',
		prompt,
		maxTokens: 450,
		temperature: 0.5,
		topP: 1,
		frequencyPenalty: 0.2,
		presencePenalty: 0,
		bestOf: 1,
		n: 1,
		user: req.user._id,
		stream: false,
		stop: ["###", "<|endoftext|>","JOB AD","TEXT" ],
	});
  
	let output = `${gptResponse.data.choices[0].text}`
	*/

	const gptResponse = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages:[{role:"user",content:prompt}],
		stop: ["###", "<|endoftext|>","JOB AD","TEXT" ],
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
	req.locals.input = prompt
	req.locals.inputRaw = inputRaw
	req.locals.output = output

	next()
	
  })

  module.exports = app