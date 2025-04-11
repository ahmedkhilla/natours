/* eslint-disable */
import { login, logout } from './login.js'
import { updateSettings } from './updateSettings.js';
import { bookTour } from './stripe.js';
import { displayMap } from './map.js';

const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');
const mapElement = document.getElementById('map');

if (mapElement) {
	const locationsData = JSON.parse(mapElement.dataset.locations);
	const { startLocation, locations } = locationsData
	displayMap(startLocation, locations);
}

if (document.querySelector('.form--login'))
	document.querySelector('.form--login').addEventListener('submit', e => {
		e.preventDefault();
		//const name = document.getElementById('name').value;
		const email = document.getElementById('email').value;
		const password = document.getElementById('password').value
		//updateSettings({ name, email }, 'data');
		login(email, password)
	});

if (document.querySelector('.nav__el--logout'))
	document.querySelector('.nav__el--logout').addEventListener('click', logout);


if (userDataForm)
	userDataForm.addEventListener('submit', e => {
		e.preventDefault();
		const form = new FormData();
		form.append('name', document.getElementById('name').value);
		form.append('email', document.getElementById('email').value);
		form.append('photo', document.getElementById('photo').files[0]);

		updateSettings(form, 'data');
	});

if (userPasswordForm)
	userPasswordForm.addEventListener('submit', async e => {
		e.preventDefault();
		document.querySelector('.btn--save-password').textContent = 'Updating...';

		const passwordCurrent = document.getElementById('password-current').value;
		const password = document.getElementById('password').value;
		const passwordConfirm = document.getElementById('password-confirm').value;
		await updateSettings(
			{ passwordCurrent, password, passwordConfirm },
			'password'
		);

		document.querySelector('.btn--save-password').textContent = 'Save password';
		document.getElementById('password-current').value = '';
		document.getElementById('password').value = '';
		document.getElementById('password-confirm').value = '';
	});

if (bookBtn)
	bookBtn.addEventListener('click', e => {
		console.log('clicked here');
		e.target.textContent = 'Processing';
		const { tourId } = e.target.dataset;
		bookTour(tourId)
	})