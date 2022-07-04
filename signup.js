"use strict";
const phoneNumberInput = document.querySelector("#phone-number");
const submit = document.querySelector(".btn");
const form = document.querySelector("form");
const password = document.querySelector("#password");
const passconfirm = document.querySelector("#pass-confirm");
const passErrorMsg = document.querySelector(".pass-error-message");

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

	if (number.length < 10) {
	}
	let areaCode = number.slice(0, 3);
	let first = number.slice(3, 6);
	let last = number.slice(6, 11);
	let newNumber = "(" + areaCode + ")" + " " + first + "-" + last;
	this.value = newNumber;
});

form.addEventListener("submit", (e) => {
	e.preventDefault();
	console.log("submitted");
	if (phoneNumberInput.value.length < 14) console.log("number too short");
	if (password.value !== passconfirm.value)
		passErrorMsg.textContent = "passwords don't match";
});
