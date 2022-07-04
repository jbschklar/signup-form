"use strict";
const phoneNumberInput = document.querySelector("#phone-number");
const submit = document.querySelector(".btn");
const form = document.querySelector("form");
const password = document.querySelector("#password");
const passConfirm = document.querySelector("#pass-confirm");
const passErrorMsg = document.querySelector(".pass-error-message");
const phoneErrorMsg = document.querySelector(".num-error-msg");
const submitValidation = document.querySelector(".submit-validation");

phoneNumberInput.addEventListener("change", function () {
	let number = this.value.split("");

	for (let i = 0; i < number.length; i++) {
		if (isNaN(number[i]) || number[i] === " ") {
			console.log(number[i]);
			number.splice(i, 1);
			i--;
		}
	}

	number = number.join("");

	let areaCode = number.slice(0, 3);
	let first = number.slice(3, 6);
	let last = number.slice(6, 11);
	let newNumber = "(" + areaCode + ")" + " " + first + "-" + last;
	this.value = newNumber;
});

const formValidation = function () {
	if (password.value !== passConfirm.value) {
		passErrorMsg.textContent = "passwords don't match";
		return false;
	}
	if (phoneNumberInput.value.length < 14) {
		phoneErrorMsg.textContent = "Invalid Number";
		return false;
	}
	passErrorMsg.textContent = "";
	return true;
};

// passConfirm.addEventListener("change", function () {
// 	if (password.value !== passConfirm.value) {
// 		passConfirm.setCustomValidity("Passwords don't match!");
// 		passErrorMsg.textContent = "passwords don't match";
// 	}
// });

// Need to add this functionality to each input field before submit to prevent submit if invalid
form.addEventListener("submit", (e) => {
	if (!formValidation()) {
		e.preventDefault();
	} else {
		submitValidation.textContent = "submitted";
	}
});
