import dotenv from 'dotenv';
dotenv.config();
import Stripe from 'stripe'
import Tour from './../models/tourModel.js';
import Booking from './../models/bookingModel.js';
import catchAsync from '../utils/catchAsync.js';
import { getAll, getOne, createOne, updateOne, deleteOne } from './handlerFactory.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


export const getCheckoutSession = catchAsync(async (req, res, next) => {
	// 1) Get the currently booked tour
	const tour = await Tour.findById(req.params.tourID)
	// 2) Create checkout session
	const session = await stripe.checkout.sessions.create({
		payment_method_types: ['card'],
		success_url: `${req.protocol}://${req.get('host')}/?tour=${req.params.tourID}&user=${req.user.id}&price=${tour.price}`,
		cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
		customer_email: req.user.email,
		client_reference_id: req.params.tourID,
		line_items: [
			{
				price_data: {
					currency: 'usd',
					product_data: {
						name: `${tour.name} Tour`,
						description: tour.summary,
						images: [`https://natours.dev/img/tours/${tour.imageCover}`],
					},
					unit_amount: tour.price * 100, // price in cents
				},
				quantity: 1,
			}
		],
		mode: 'payment',
	});

	// 3) Create seeion as response
	res.status(200).json({
		status: 'success',
		session
	})
})


export const createBookingCheckout = catchAsync(async (req, res, next) => {
	// This is only TEMPORARY, because it's UNSECURE: everyone can make bookings without paying
	const { tour, user, price } = req.query;
	if (!tour && !user && !price) return next();
	await Booking.create({ tour, user, price });
	res.redirect(req.originalUrl.split('?')[0]);
});


export const createBooking = createOne(Booking);
export const getBooking = getOne(Booking);
export const getAllBookings = getAll(Booking);
export const updateBooking = updateOne(Booking);
export const deleteBooking = deleteOne(Booking);