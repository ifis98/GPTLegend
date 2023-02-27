const OpenAI = require('openai-api');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
//console.log(process.env)
const openai = new OpenAI(OPENAI_API_KEY);

module.exports = openai