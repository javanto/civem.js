/**
 * {{= it.title}} v{{= it.version}}
 *
 * Copyright 2012, {{= it.author.name}} <{{= it.author.email}}>
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function(d) {
	var formElements = [];
	var inputElements = d.getElementsByTagName("input");
	for (var i = 0; i < inputElements.length; i++)
		formElements.push(inputElements[i]);
	var textareaElements = d.getElementsByTagName("textarea");
	for (var i = 0; i < textareaElements.length; i++)
		formElements.push(textareaElements[i]);
	var selectElements = d.getElementsByTagName("select");
	for (var i = 0; i < selectElements.length; i++)
		formElements.push(selectElements[i]);
	for (var i = 0; i < formElements.length; i++) {
		var formElement = formElements[i];
		if (!formElement.willValidate)
			continue;
		if (formElement.oninput)
			var inputCallback = formElement.oninput;
		formElement.oninput = function(event) {
			event.target.setCustomValidity("");
			if (inputCallback)
				inputCallback(event);
		};
		if (formElement.onchange)
			var changeCallback = formElement.onchange;
		formElement.onchange = function(event) {
			event.target.checkValidity();
			if (changeCallback)
				changeCallback(event);
		}
		if (formElement.oninvalid)
			var invalidCallback = formElement.oninvalid;
		formElement.oninvalid = function(event) {
			var element = event.target;
			var validity = element.validity;
			var postfix = validity.valueMissing? "value-missing" : validity.typeMismatch? "type-mismatch" : validity.patternMismatch? "pattern-mismatch" : validity.tooLong? "too-long" : validity.rangeUnderflow ? "range-underflow" : validity.rangeOverflow? "range-overflow" : validity.stepMismatch? "step-mismatch" : validity.customError? "custom-error" : "";
			var specificErrormessage, genericErrormessage;
			if (postfix && (specificErrormessage = element.getAttribute("data-errormessage-" + postfix)))
				element.setCustomValidity(specificErrormessage);
			else if (genericErrormessage = element.getAttribute("data-errormessage"))
				element.setCustomValidity(genericErrormessage);
			else
				element.setCustomValidity(element.validationMessage);
			if (invalidCallback)
				invalidCallback(event);
		}
	}
}(document));
