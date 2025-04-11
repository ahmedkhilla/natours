/* eslint-disable */
const stripe = Stripe('pk_test_51RBxaIHJH8vBPo5TYWnLN7V5N6MHo5uImMovk6fMiVtzqUGSyVZzZTxmxSu9Jf1gZYkJsxKD2LLnaoL5CqSOTJjr00dT86MN1F');

export const bookTour = async tourId => {
	try {

		// 1) Get checkout session from API
		const session = await axios(`http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`)
		console.log(session);
		// 2) Create checkout form + chanre credit card
		await stripe.redirectToCheckout({
			sessionId: session.data.session.id
		})
	} catch (err) {
		console.log(err);
		showAlert('error', err)
	}
}


