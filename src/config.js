const dev = {
	baseURL: "http://13.58.242.248:3080/api/",
	landingPageUrl: "http://13.58.242.248:3080",
	stripe: {
		free: "price_1MKISQKDl4BWQxUPCjluSykk",
		entry: "price_1MeuPTIx2p82pZtXAYmV9OMk",
		pro: "price_1Mf7DiIx2p82pZtXVdv9Bg9J"
	},
};
  
const prod = {
	baseURL: '/api/',
	landingPageUrl: "https://app.openaitemplate.com",
	stripe: {
		free: "price_1MKISQKDl4BWQxUPCjluSykk",
		entry: "price_1MeuPTIx2p82pZtXAYmV9OMk",
		pro: "price_1Mf7DiIx2p82pZtXVdv9Bg9J"
	},
};
  
const config = process.env.NODE_ENV === 'development'
	? dev
	: prod;
  
export default config;