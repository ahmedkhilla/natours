/* eslint-disable */
const swiper = new Swiper('.swiper', {
	breakpoints: {
		0: {
			slidesPerView: 1
		},
		768: {
			slidesPerView: 2
		},
		1024: {
			slidesPerView: 3
		},
		1440: {
			slidesPerView: 5
		}
	},
	spaceBetween: 24,
	loop: true,
	pagination: {
		el: '.swiper-pagination',
		clickable: true
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	}
});
