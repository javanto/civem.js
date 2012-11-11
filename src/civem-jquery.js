/**
 * {{= it.title}} v{{= it.version}}
 *
 * Copyright 2012, {{= it.author.name}} <{{= it.author.email}}>
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
jQuery(function($) {

	$('input, textarea, select').each(function() {

		if (!this.willValidate)
			return true;

		$(this)
			.bind('input', function() {
				this.setCustomValidity('');
			})
			.bind('invalid', function() {

				var validity = this.validity,
				    suffix = validity.valueMissing? 'value-missing' : validity.typeMismatch? 'type-mismatch' : validity.patternMismatch? 'pattern-mismatch' : validity.tooLong? 'too-long' : validity.rangeUnderflow? 'range-underflow' : validity.rangeOverflow? 'range-overflow' : validity.stepMismatch? 'step-mismatch' : validity.customError? 'custom-error' : '',
				    message;

				this.setCustomValidity(
					suffix && (message = this.getAttribute('data-errormessage-' + suffix))? message :
					(message = this.getAttribute('data-errormessage'))? message :
					this.validationMessage
				);
			});
	});
});
