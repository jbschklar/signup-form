"use strict";
const phoneNumberInput = document.querySelector("#phone-number");
const form = document.querySelector("form");
const password = document.querySelector("#password");
const passConfirm = document.querySelector("#pass-confirm");
const passErrorMsg = document.querySelector(".pass-error-message");
const phoneErrorMsg = document.querySelector(".num-error-msg");
const submitValidation = document.querySelector(".submit-validation");
const requiredInputs = document.querySelectorAll(".required");
const listEl = document.createElement("ul");

// Function to auto format phone number as it's entered
phoneNumberInput.addEventListener("input", function () {
	let number = this.value.split("");

	// This is to remove any non numerical characters entered by user
	for (let i = 0; i < number.length; i++) {
		if (isNaN(number[i]) || number[i] === " ") {
			number.splice(i, 1);
			i--;
		}
	}

	number = number.join("");

	// This puts the area code and subsiquent numbers in the correct format
	let areaCode = number.slice(0, 3);
	let first = number.slice(3, 6);
	let last = number.slice(6, 11);
	let newNumber =
		"(" + areaCode + ")" + " " + first + (number.length > 6 ? "-" + last : "");
	this.value = newNumber;
});

// Function to validate fields and prevent submit if not correct on when form is submitted by user
const formValidation = function () {
	const passwordConditions = ["!", "@", "#", "$", "%", "&", "*"];
	const passwordTest = passwordConditions.some((sym) =>
		password.value.includes(sym)
	);

	requiredInputs.forEach((input) => {
		if (!input.value) {
			// to avoid adding 'required field' to UL under password field
			if (input.nextElementSibling.nodeName === "SPAN")
				input.nextElementSibling.textContent = "* Required field";
			return false;
		} else {
			input.nextElementSibling.textContent = "";
		}
	});

	if (!passwordTest || password.value.length < 8) {
		listEl.innerHTML = `<li>Password must contain</li><li>at least 8 characters</li><li>at least one special character</li><li>(! @ # $ % & *)</li>`;
		password.insertAdjacentElement("afterend", listEl);
		password.classList.add("error");
		return false;
	} else {
		listEl.innerHTML = "";
		password.classList.remove("error");
	}

	if (password.value !== passConfirm.value) {
		passErrorMsg.textContent = "Passwords don't match";
		passConfirm.classList.add("error");
		return false;
	} else {
		passErrorMsg.textContent = "";
		passConfirm.classList.remove("error");
	}

	if (phoneNumberInput.value.length < 14) {
		phoneErrorMsg.textContent = "Invalid Number";
		return false;
	}

	passErrorMsg.textContent = "";
	return true;
};

form.addEventListener("submit", (e) => {
	// e.preventDefault();
	if (!formValidation()) {
		e.preventDefault();
	} else {
		submitValidation.textContent = "submitted";
	}
});
