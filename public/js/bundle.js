/* eslint-disable */ /* eslint-disable */ /* eslint-disable */ const $1eb0cc260df27e1b$var$hideAlert = ()=>{
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
};
const $1eb0cc260df27e1b$export$de026b00723010c1 = (type, msg)=>{
    $1eb0cc260df27e1b$var$hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout($1eb0cc260df27e1b$var$hideAlert, 5000);
};


const $e33d9ff231aec008$export$596d806903d1f59e = async (email, password)=>{
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/users/login',
            data: {
                email: email,
                password: password
            }
        });
        if (res.data.status === 'success') {
            (0, $1eb0cc260df27e1b$export$de026b00723010c1)('success', 'Logged in successfully!');
            console.log('hey you successed');
            window.setTimeout(()=>{
                location.assign('/');
            }, 1500);
        }
    } catch (err) {
        (0, $1eb0cc260df27e1b$export$de026b00723010c1)('error', err.response.data.message);
        console.log(err);
    }
};
const $e33d9ff231aec008$export$a0973bcfe11b05c9 = async ()=>{
    try {
        const res = await axios({
            method: 'GET',
            url: 'http://127.0.0.1:3000/api/v1/users/logout'
        });
        res.data.status = 'success';
        location.reload(true);
    } catch (err) {
        console.log(err.response);
        (0, $1eb0cc260df27e1b$export$de026b00723010c1)('error', 'Error logging out! Try again.');
    }
};


/* eslint-disable */ 
const $a7bd2b0e83ecbd10$export$f558026a994b6051 = async (data, type)=>{
    try {
        const url = type === 'password' ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword' : 'http://127.0.0.1:3000/api/v1/users/updateMe';
        const res = await axios({
            method: 'PATCH',
            url: url,
            data: data
        });
        if (res.data.status === 'success') (0, $1eb0cc260df27e1b$export$de026b00723010c1)('success', `${type.toUpperCase()} updated successfully!`);
    } catch (err) {
        (0, $1eb0cc260df27e1b$export$de026b00723010c1)('error', err.response.data.message);
    }
};


/* eslint-disable */ const $245ad133cda49593$var$stripe = Stripe('pk_test_51RBxaIHJH8vBPo5TYWnLN7V5N6MHo5uImMovk6fMiVtzqUGSyVZzZTxmxSu9Jf1gZYkJsxKD2LLnaoL5CqSOTJjr00dT86MN1F');
const $245ad133cda49593$export$8d5bdbf26681c0c2 = async (tourId)=>{
    try {
        // 1) Get checkout session from API
        const session = await axios(`http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`);
        console.log(session);
        // 2) Create checkout form + chanre credit card
        await $245ad133cda49593$var$stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });
    } catch (err) {
        console.log(err);
        showAlert('error', err);
    }
};


/* eslint-disable */ const $dc035ac067b37623$export$4c5dd147b21b9176 = (startLocation, locations)=>{
    console.log(startLocation);
    console.log(locations, 'start');
    const [lng, lat] = startLocation.coordinates;
    console.log(lat, lng, 'after');
    const map = L.map('map', {
        zoomControl: false,
        scrollWheelZoom: false
    }).setView([
        lat,
        lng
    ], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    const bounds = L.latLngBounds();
    locations.forEach((loc)=>{
        const [lng, lat] = loc.coordinates;
        const marker = L.marker([
            lat,
            lng
        ]).addTo(map);
        marker.bindPopup(`<p>${loc.day ? `Day ${loc.day}: ` : ''}${loc.description}</p>`, {
            autoClose: false
        }).openPopup();
        bounds.extend(marker.getLatLng());
    });
    map.fitBounds(bounds, {
        padding: [
            100,
            100
        ]
    });
};


const $1cd085a7ac742057$var$userDataForm = document.querySelector('.form-user-data');
const $1cd085a7ac742057$var$userPasswordForm = document.querySelector('.form-user-password');
const $1cd085a7ac742057$var$bookBtn = document.getElementById('book-tour');
const $1cd085a7ac742057$var$mapElement = document.getElementById('map');
if ($1cd085a7ac742057$var$mapElement) {
    const locationsData = JSON.parse($1cd085a7ac742057$var$mapElement.dataset.locations);
    const { startLocation: startLocation, locations: locations } = locationsData;
    (0, $dc035ac067b37623$export$4c5dd147b21b9176)(startLocation, locations);
}
if (document.querySelector('.form--login')) document.querySelector('.form--login').addEventListener('submit', (e)=>{
    e.preventDefault();
    //const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    //updateSettings({ name, email }, 'data');
    (0, $e33d9ff231aec008$export$596d806903d1f59e)(email, password);
});
if (document.querySelector('.nav__el--logout')) document.querySelector('.nav__el--logout').addEventListener('click', (0, $e33d9ff231aec008$export$a0973bcfe11b05c9));
if ($1cd085a7ac742057$var$userDataForm) $1cd085a7ac742057$var$userDataForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    (0, $a7bd2b0e83ecbd10$export$f558026a994b6051)(form, 'data');
});
if ($1cd085a7ac742057$var$userPasswordForm) $1cd085a7ac742057$var$userPasswordForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await (0, $a7bd2b0e83ecbd10$export$f558026a994b6051)({
        passwordCurrent: passwordCurrent,
        password: password,
        passwordConfirm: passwordConfirm
    }, 'password');
    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
});
if ($1cd085a7ac742057$var$bookBtn) $1cd085a7ac742057$var$bookBtn.addEventListener('click', (e)=>{
    console.log('clicked here');
    e.target.textContent = 'Processing';
    const { tourId: tourId } = e.target.dataset;
    (0, $245ad133cda49593$export$8d5bdbf26681c0c2)(tourId);
});


//# sourceMappingURL=bundle.js.map
