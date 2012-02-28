/**
 * {{= it.title}} v{{= it.version}}
 *
 * Copyright 2012, {{= it.author.name}} <{{= it.author.email}}>
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
var inputs = document.getElementsByTagName("input");
for (var i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    if (!input.willValidate)
        continue;
    if (input.oninput)
        var inputCallback = input.oninput;
    input.oninput = function(event) {
        event.target.setCustomValidity("");
        if (inputCallback)
            inputCallback(event);
    };
    if (input.onchange)
        var changeCallback = input.onchange;
    input.onchange = function(event) {
        event.target.checkValidity();
        if (changeCallback)
            changeCallback(event);
    }
    if (input.oninvalid)
        var invalidCallback = input.oninvalid;
    input.oninvalid = function(event) {
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
