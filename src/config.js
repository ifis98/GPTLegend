const dev = {
	baseURL: "http://13.58.242.248:3080/api/",
	landingPageUrl: "http://13.58.242.248:3080",
	stripe: {
		free: "price_1MeuTXIx2p82pZtXV3CT8gIX",
		entry: "price_1MeuPTIx2p82pZtXAYmV9OMk",
		pro: "price_1MeuUmIx2p82pZtX3F52rtXT"
	},
};
  
const prod = {
	baseURL: '/api/',
	landingPageUrl: "https://app.openaitemplate.com",
	stripe: {
		free: "price_1MeuTXIx2p82pZtXV3CT8gIX",
		entry: "price_1MeuPTIx2p82pZtXAYmV9OMk",
		pro: "price_1MeuUmIx2p82pZtX3F52rtXT"
	},
};
  
const config = process.env.NODE_ENV === 'development'
	? dev
	: prod;
  
export default config;