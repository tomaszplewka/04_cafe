// Initialization
document.addEventListener('DOMContentLoaded', () => {
	// sidenav
	var elemsSidenav = document.querySelectorAll('.sidenav');
	var instancesSidenav = M.Sidenav.init(elemsSidenav, {});
	// tabs
	var elemsTabs = document.querySelectorAll('.tabs');
	var instanceTabs = M.Tabs.init(elemsTabs, {});
	// modal
	var elemsModal = document.querySelectorAll('.modal');
	var instancesModal = M.Modal.init(elemsModal,
		{
			onOpenStart: function() {
				const selectInput = document.querySelector('#services-form .select-wrapper input');
				selectInput.classList.remove('invalid');
			},
			onCloseStart: function() {
				modalContent.scrollTop = 0;
				// general form
				if (modalServicesFormLi.firstElementChild.classList.contains('active')) {
					Array.from(servicesFormInputs).forEach((input) => {
						if (input.classList.contains('invalid')) {
							input.nextElementSibling.nextElementSibling.style.display = 'none';
							input.classList.remove('invalid');
						}
						if (input.classList.contains('valid')) {
							input.classList.remove('valid');
						}
					});
					if (messageInputServices.classList.contains('invalid')) {
						messageInputServices.nextElementSibling.nextElementSibling.style.display = 'none';
						messageInputServices.classList.remove('invalid');
						feedbackTextServices.nextElementSibling.classList.remove('invalid');
					}
					if (messageInputServices.classList.contains('valid')) {
						messageInputServices.classList.remove('valid');
						feedbackTextServices.nextElementSibling.classList.remove('valid');
					}
					const selectInput = document.querySelector('#services-form .select-wrapper input');
					if (
						selectInput.classList.contains('invalid')
					) {
						selectInput.classList.remove('invalid');
						const selectFeedbackMsg = document.querySelector('.select-wrapper').nextElementSibling;
						selectFeedbackMsg.style.display = 'none';
					}
					if (
						selectInput.classList.contains('valid')
					) {
						selectInput.classList.remove('valid');
					}
					lengthSpanServices.textContent = 0;
					servicesForm.reset();
				}

				// services form
				if (modalGeneralFormLi.firstElementChild.classList.contains('active')) {
					Array.from(generalFormInputs).forEach((input) => {
						if (input.classList.contains('invalid')) {
							input.nextElementSibling.nextElementSibling.style.display = 'none';
							input.classList.remove('invalid');
						}
						if (input.classList.contains('valid')) {
							input.classList.remove('valid');
						}
					});
					if (messageInputGeneral.classList.contains('invalid')) {
						messageInputGeneral.nextElementSibling.nextElementSibling.style.display = 'none';
						messageInputGeneral.classList.remove('invalid');
						feedbackTextGeneral.nextElementSibling.classList.remove('invalid');
					}
					if (messageInputGeneral.classList.contains('valid')) {
						messageInputGeneral.classList.remove('valid');
						feedbackTextGeneral.nextElementSibling.classList.remove('valid');
					}
					lengthSpanGeneral.textContent = 0;
					generalForm.reset();
				}
			}
		}
	);
	// form select
	var elemsSelect = document.querySelectorAll('select');
	var instancesSelect = M.FormSelect.init(elemsSelect, {});
	// datepicker
	var elemsDP = document.querySelectorAll('.datepicker');
	var instancesDP = M.Datepicker.init(elemsDP, {});
	// timepicker
	var elemsTP = document.querySelectorAll('.timepicker');
	var instancesTP = M.Timepicker.init(elemsTP, {});
	// collapsible
	var elemsCollapsible = document.querySelectorAll('.collapsible');
	var instancesCollapsible = M.Collapsible.init(elemsCollapsible, {});
	// tooltip
	var elemsTooltip = document.querySelectorAll('.tooltipped');
	var instancesTooltip = M.Tooltip.init(elemsTooltip, {
		transitionMovement: -6
	});
	// tap-target
	var elemsTap = document.querySelector('.tap-target');
	var instancesTap = M.TapTarget.init(elemsTap, {});
	// carousel
	var carouselElems = document.querySelector('.carousel');
	var carouselInstance = M.Carousel.init(
		carouselElems,
		{
			// fullWidth: true,
			indicators: true,
			numVisible: 3,
			dist: 20
		}
	);
	function moveNextCarousel() {
		var elems = document.querySelector('.carousel');
		var moveRight = M.Carousel.getInstance(elems);
		moveRight.next(1);
	}
	autoplay();
	function autoplay() {
		moveNextCarousel();
		setTimeout(autoplay, 4000);
	}
});

// Auto-close Feature Discovery Btn
const tapTarget = document.querySelector('.tap-target');

tapTarget.addEventListener('click', (e) => {
	if (e.target.classList.contains('modal-trigger')) {
		e.target.parentElement.parentElement.parentElement.classList.remove('open');
	}
});

// Open Feature Discovery Btn upon Click Event
const menuBtn = document.querySelector('#menu');

menuBtn.addEventListener('click', () => {
	var elemsTap = document.querySelector('.tap-target');
	var instancesTap = M.TapTarget.getInstance(elemsTap);
	instancesTap.open();

});

// RegEx Patterns
const namePattern = /^([a-zA-Z]+(\-[a-zA-Z]+)?)( ?([a-zA-Z]+)?){0,2}$/;
const phonePattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[ .-]?\d{3}[ .-]?\d{4}$/;
const emailPattern = /^([a-zA-Z]{1}[\w\.]{0,30})@([a-zA-Z]{2,15})\.([a-zA-Z]{2,5})(\.[a-zA-Z]{2,5})?$/;
const datePattern = /^(?!\s*$).+/;
const timePattern = /^([0]?[0-9]|1[0-2]):[0-5][0-9] [AP]M$/;
const messagePattern = /^.*\S.*$/;

// Input Styling Function
const inputStyling = (inputType, inputPattern, event, showMsg) => {
	if (inputPattern.test(inputType.value)) {
		event.target.classList.remove('invalid');
		event.target.classList.add('valid');
		if (inputType.nextElementSibling.nextElementSibling.classList.contains('tooltip-feedback')) {
			inputType.nextElementSibling.nextElementSibling.style.visibility = 'hidden';
		} else {
			inputType.nextElementSibling.nextElementSibling.style.display = 'none';
		}
	} else {
		event.target.classList.remove('valid');
		event.target.classList.add('invalid');
		if (inputType.nextElementSibling.nextElementSibling.classList.contains('tooltip-feedback')) {
			inputType.nextElementSibling.nextElementSibling.style.visibility = 'visible';
		} else if (showMsg) {
			inputType.nextElementSibling.nextElementSibling.style.display = 'inline-block';
		}
	}
};

// Textarea Styling Function
const textareaStyling = (inputType, inputPattern, feedbackMsg) => {
	if (!inputPattern.test(inputType.value)) {
		inputType.classList.remove('valid');
		inputType.classList.add('invalid');
		feedbackMsg.nextElementSibling.classList.remove('valid');
		feedbackMsg.nextElementSibling.classList.add('invalid');
	} else {
		inputType.classList.remove('invalid');
		inputType.classList.add('valid');
		inputType.nextElementSibling.nextElementSibling.style.display = 'none';
		feedbackMsg.nextElementSibling.classList.remove('invalid');
		feedbackMsg.nextElementSibling.classList.add('valid');
	}

	if (inputType.value.length > 300) {
		inputType.classList.remove('valid');
		inputType.classList.add('invalid');
		feedbackMsg.nextElementSibling.classList.remove('valid');
		feedbackMsg.nextElementSibling.classList.add('invalid');
		feedbackMsg.style.display = 'inline-block';
	} else if (inputType.value.length === 0) {
		feedbackMsg.style.display = 'none';
	} else {
		feedbackMsg.style.display = 'none';
	}
};

// Check Input Validity
const checkEveryInput = (inputs) => {
	return Array.from(inputs).every((curr) => {
		return curr.classList.contains('valid');
	});
};

// Name Inputs
const nameInputs = document.querySelectorAll('.name-input');

nameInputs.forEach((nameInput) => {
	nameInput.addEventListener('keyup', (e) => {
		let showMsg = false;
		if (nameInput.nextElementSibling.nextElementSibling.classList.contains('tooltip-feedback')) {
			showMsg = true;
			nameInput.nextElementSibling.nextElementSibling.style.width = nameInput.offsetWidth + 'px';
		}
		inputStyling(nameInput, namePattern, e, showMsg);
	});
});

// Phone Inputs
const phoneInputs = document.querySelectorAll('.phone-input');

phoneInputs.forEach((phoneInput) => {
	phoneInput.addEventListener('keyup', (e) => {
		let showMsg = false;
		if (phoneInput.nextElementSibling.nextElementSibling.classList.contains('tooltip-feedback')) {
			showMsg = true;
			phoneInput.nextElementSibling.nextElementSibling.style.width = phoneInput.offsetWidth + 'px';
		}
		inputStyling(phoneInput, phonePattern, e, showMsg);
	});
});

// Email Inputs
const emailInputs = document.querySelectorAll('.email-input');

emailInputs.forEach((emailInput) => {
	emailInput.addEventListener('keyup', (e) => {
		let showMsg = false;
		if (emailInput.nextElementSibling.nextElementSibling.classList.contains('tooltip-feedback')) {
			showMsg = true;
		}
		inputStyling(emailInput, emailPattern, e, showMsg);
	});
});

// Date Inputs
const dateInput = document.querySelector('.date-input');

dateInput.addEventListener('change', (e) => {
	let showMsg = false;
	if (dateInput.nextElementSibling.nextElementSibling.classList.contains('tooltip-feedback')) {
		showMsg = true;
		dateInput.nextElementSibling.nextElementSibling.style.width = dateInput.offsetWidth + 'px';
	}
	inputStyling(dateInput, datePattern, e, showMsg);
});

dateInput.addEventListener('keyup', (e) => {
	let showMsg = false;
	if (dateInput.nextElementSibling.nextElementSibling.classList.contains('tooltip-feedback')) {
		showMsg = true;
		dateInput.nextElementSibling.nextElementSibling.style.width = dateInput.offsetWidth + 'px';
	}
	inputStyling(dateInput, datePattern, e, showMsg);
});

// Time Inputs
const timeInput = document.querySelector('.time-input');

timeInput.addEventListener('change', (e) => {
	let showMsg = false;
	if (timeInput.nextElementSibling.nextElementSibling.classList.contains('tooltip-feedback')) {
		showMsg = true;
		timeInput.nextElementSibling.nextElementSibling.style.width = timeInput.offsetWidth + 'px';
	}
	inputStyling(timeInput, timePattern, e, showMsg);
});

timeInput.addEventListener('keyup', (e) => {
	let showMsg = false;
	if (timeInput.nextElementSibling.nextElementSibling.classList.contains('tooltip-feedback')) {
		showMsg = true;
		timeInput.nextElementSibling.nextElementSibling.style.width = timeInput.offsetWidth + 'px';
	}
	inputStyling(timeInput, timePattern, e, showMsg);
});

// Textarea Inputs
const messageInputGeneral = document.querySelector('#general-form .materialize-textarea');
const lengthSpanGeneral = document.querySelector('#general-form .length');
const feedbackTextGeneral = document.querySelector('#general-form .feedback-text');

messageInputGeneral.addEventListener('keyup', () => {
	lengthSpanGeneral.textContent = messageInputGeneral.value.length;
	textareaStyling(messageInputGeneral, messagePattern, feedbackTextGeneral);
	messageInputGeneral.nextElementSibling.nextElementSibling.style.width = messageInputGeneral.offsetWidth - 40 + 'px';
	messageInputGeneral.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.style.width =
		messageInputGeneral.offsetWidth - 40 + 'px';
});

const messageInputServices = document.querySelector('#services-form .materialize-textarea');
const lengthSpanServices = document.querySelector('#services-form .length');
const feedbackTextServices = document.querySelector('#services-form .feedback-text');

messageInputServices.addEventListener('keyup', (e) => {
	lengthSpanServices.textContent = messageInputServices.value.length;
	textareaStyling(messageInputServices, messagePattern, feedbackTextServices);
	messageInputServices.nextElementSibling.nextElementSibling.style.width =
		messageInputServices.offsetWidth - 40 + 'px';
	messageInputServices.nextElementSibling.nextElementSibling.nextElementSibling.firstElementChild.style.width =
		messageInputServices.offsetWidth - 40 + 'px';
});

// Select Inputs
const servicesSelect = document.querySelector('#services-form select');

servicesSelect.addEventListener('change', () => {
	const selectFeedbackMsg = document.querySelector('.select-wrapper').nextElementSibling;
	if (selectFeedbackMsg.style.display === 'inline-block') {
		selectFeedbackMsg.style.display = 'none';
	}
	if (!(servicesSelect.value === '')) {
		servicesSelect.parentElement.firstElementChild.classList.remove('invalid');
		servicesSelect.parentElement.firstElementChild.classList.add('valid');
	} else {
		servicesSelect.parentElement.firstElementChild.classList.remove('valid');
		servicesSelect.parentElement.firstElementChild.classList.add('invalid');
	}
});

// Submit Event -- #booking-form
const bookingForm = document.querySelector('#booking-form');
const bookingSubmit = document.querySelector('#booking-form button');
const bookingFormInputs = document.querySelectorAll('#booking-form input');

bookingForm.addEventListener('click', () => {
	if (checkEveryInput(bookingFormInputs)) {
		bookingSubmit.disabled = false;
	} else {
		bookingSubmit.disabled = true;
	}
});

bookingForm.addEventListener('keyup', () => {
	if (checkEveryInput(bookingFormInputs)) {
		bookingSubmit.disabled = false;
	} else {
		bookingSubmit.disabled = true;
	}
});

bookingForm.addEventListener('submit', (e) => {
	e.preventDefault();
	bookingForm.reset();
	bookingSubmit.disabled = false;
	bookingForm.firstElementChild.style.display = 'flex';
	setTimeout(() => {
		bookingForm.firstElementChild.style.display = 'none';
		bookingSubmit.disabled = true;
	}, 3000);
});

const bookATableLi = document.querySelector('#book-a-table');

bookATableLi.firstElementChild.addEventListener('click', () => {
	if (bookATableLi.classList.contains('active')) {
		bookingForm.reset();
	}
});

// Submit Event -- #general-form
const generalForm = document.querySelector('#general-form');
const generalSubmit = document.querySelector('#general-form button');
const generalFormInputs = document.querySelectorAll('#general-form input');
const modalContent = document.querySelector('#contact-form .modal-content');

generalForm.addEventListener('submit', (e) => {
	e.preventDefault();

	if (checkEveryInput(generalFormInputs) && messageInputGeneral.classList.contains('valid')) {
		generalForm.reset();
		lengthSpanGeneral.textContent = 0;
		feedbackTextGeneral.nextElementSibling.classList.remove('valid');
		modalContent.scrollTop = 0;
		modalContent.style.overflowY = 'hidden';
		generalForm.firstElementChild.style.display = 'flex';
		setTimeout(() => {
			modalContent.style.overflowY = 'auto';
			generalForm.firstElementChild.style.display = 'none';
		}, 3000);
	} else {
		Array.from(generalFormInputs).forEach((input) => {
			if (input.classList.contains('invalid') || !input.classList.contains('valid')) {
				input.nextElementSibling.nextElementSibling.style.display = 'inline-block';
				input.classList.add('invalid');
			}
		});
		if (messageInputGeneral.classList.contains('invalid') || !messageInputGeneral.classList.contains('valid')) {
			messageInputGeneral.nextElementSibling.nextElementSibling.style.display = 'inline-block';
			messageInputGeneral.classList.add('invalid');
			feedbackTextGeneral.nextElementSibling.classList.add('invalid');
		}
		modalContent.scrollTop = 0;
	}
});

const modalGeneralFormLi = document.querySelector('#modal-general-form');

modalGeneralFormLi.addEventListener('click', () => {
	if (!modalGeneralFormLi.firstElementChild.classList.contains('active')) {
		Array.from(servicesFormInputs).forEach((input) => {
			if (input.classList.contains('invalid')) {
				input.nextElementSibling.nextElementSibling.style.display = 'none';
				input.classList.remove('invalid');
			}
			if (input.classList.contains('valid')) {
				input.classList.remove('valid');
			}
		});
		if (messageInputServices.classList.contains('invalid')) {
			messageInputServices.nextElementSibling.nextElementSibling.style.display = 'none';
			messageInputServices.classList.remove('invalid');
			feedbackTextServices.nextElementSibling.classList.remove('invalid');
		}
		if (messageInputServices.classList.contains('valid')) {
			messageInputServices.classList.remove('valid');
			feedbackTextServices.nextElementSibling.classList.remove('valid');
		}
		const selectInput = document.querySelector('#services-form .select-wrapper input');
		if (
			selectInput.classList.contains('invalid')
		) {
			selectInput.classList.remove('invalid');
			const selectFeedbackMsg = document.querySelector('.select-wrapper').nextElementSibling;
			selectFeedbackMsg.style.display = 'none';
		}
		if (
			selectInput.classList.contains('valid')
		) {
			selectInput.classList.remove('valid');
		}
		lengthSpanServices.textContent = 0;
		servicesForm.reset();
	}
});

// Submit Event -- #services-form
const servicesForm = document.querySelector('#services-form');
const servicesSubmit = document.querySelector('#services-form button');
const servicesFormInputs = document.querySelectorAll('#services-form input');

servicesForm.addEventListener('submit', (e) => {
	e.preventDefault();

	if (checkEveryInput(servicesFormInputs) && messageInputServices.classList.contains('valid')) {
		servicesForm.reset();
		lengthSpanServices.textContent = 0;
		feedbackTextServices.nextElementSibling.classList.remove('valid');
		modalContent.scrollTop = 0;
		modalContent.style.overflowY = 'hidden';
		servicesForm.firstElementChild.style.display = 'flex';
		setTimeout(() => {
			modalContent.style.overflowY = 'auto';
			servicesForm.firstElementChild.style.display = 'none';
			servicesSelect.parentElement.firstElementChild.classList.remove('invalid');
		}, 3000);
	} else {
		Array.from(servicesFormInputs).forEach((input) => {
			if (input.classList.contains('invalid') || !input.classList.contains('valid')) {
				input.nextElementSibling.nextElementSibling.style.display = 'inline-block';
				input.classList.add('invalid');
			}
		});
		if (messageInputServices.classList.contains('invalid') || !messageInputServices.classList.contains('valid')) {
			messageInputServices.nextElementSibling.nextElementSibling.style.display = 'inline-block';
			messageInputServices.classList.add('invalid');
			feedbackTextServices.nextElementSibling.classList.add('invalid');
		}

		if (
			servicesSelect.parentElement.firstElementChild.classList.contains('invalid') ||
			!servicesSelect.parentElement.firstElementChild.classList.contains('valid')
		) {
			servicesSelect.parentElement.firstElementChild.classList.remove('valid');
			servicesSelect.parentElement.firstElementChild.classList.add('invalid');
			const selectFeedbackMsg = document.querySelector('.select-wrapper').nextElementSibling;
			selectFeedbackMsg.style.display = 'inline-block';
		}
		modalContent.scrollTop = 0;
	}
});

const modalServicesFormLi = document.querySelector('#modal-services-form');

modalServicesFormLi.addEventListener('click', () => {
	if (!modalServicesFormLi.firstElementChild.classList.contains('active')) {
		const selectInput = document.querySelector('#services-form .select-wrapper input');
		selectInput.classList.remove('invalid');
		Array.from(generalFormInputs).forEach((input) => {
			if (input.classList.contains('invalid')) {
				input.nextElementSibling.nextElementSibling.style.display = 'none';
				input.classList.remove('invalid');
			}
			if (input.classList.contains('valid')) {
				input.classList.remove('valid');
			}
		});
		if (messageInputGeneral.classList.contains('invalid')) {
			messageInputGeneral.nextElementSibling.nextElementSibling.style.display = 'none';
			messageInputGeneral.classList.remove('invalid');
			feedbackTextGeneral.nextElementSibling.classList.remove('invalid');
		}
		if (messageInputGeneral.classList.contains('valid')) {
			messageInputGeneral.classList.remove('valid');
			feedbackTextGeneral.nextElementSibling.classList.remove('valid');
		}
		lengthSpanGeneral.textContent = 0;
		generalForm.reset();
	}
});
