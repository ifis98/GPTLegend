const models = require("../models")
const User = models.user;

const invoice = async (eventType,data) => {

	if (!eventType.includes("invoice")) {
		return // not a subscription event
	}
	
	paid(eventType,data)

}

const paid = async (eventType,data) => {

	console.log("paid event hit")

	if (!eventType.includes("invoice.paid")) {
		return // not a subscription event
	}
	const { object } = data
	console.log(eventType)
	console.log(object)

	let credits = 0

	// 500 credits for $30
	if(object.amount_paid > 900){
		//credits += (object.amount_paid / 12)
		credits += 1000
	}
	if(object.amount_paid > 1900){
		//credits += (object.amount_paid / 12)
		credits += 2000
	}

	let user = await User.findOne({
		customerId: object.customer
	})

	if(object.amount_paid > 0){
		if(user){
			if(!user.referrerPaid){
				let referrer = await User.findOne({
					_id: user.referrer
				})
				if(referrer){
					referrer.credits += 100
					user.referrerPaid = true
					referrer.save()
				}
			}
			user.credits += credits
			user.save()
		}
	}

	

	// await User
	// 	.updateOne({ customerId: object.customer },
	// 		{ $inc: { credits } })
	// 	.exec()
}

module.exports = invoice