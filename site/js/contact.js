/* =========================================================================
   contact.js — contact form validation
   Checks: no empty fields, valid email format, digits-only phone number.
   ========================================================================= */

(function () {
  "use strict";

  var form = document.getElementById("contactForm");
  if (!form) return; // only run on contact.html

  var status = document.getElementById("formStatus");

  var fields = {
    name: { input: document.getElementById("cName"), wrap: document.getElementById("fieldName"), err: document.getElementById("errName") },
    email: { input: document.getElementById("cEmail"), wrap: document.getElementById("fieldEmail"), err: document.getElementById("errEmail") },
    phone: { input: document.getElementById("cPhone"), wrap: document.getElementById("fieldPhone"), err: document.getElementById("errPhone") },
    message: { input: document.getElementById("cMessage"), wrap: document.getElementById("fieldMessage"), err: document.getElementById("errMessage") }
  };

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var PHONE_DIGITS_RE = /^[0-9]+$/;

  function setError(field, message) {
    field.wrap.classList.toggle("invalid", Boolean(message));
    field.err.textContent = message || "";
  }

  function validateName() {
    var val = fields.name.input.value.trim();
    if (!val) {
      setError(fields.name, "Please enter your name.");
      return false;
    }
    setError(fields.name, "");
    return true;
  }

  function validateEmail() {
    var val = fields.email.input.value.trim();
    if (!val) {
      setError(fields.email, "Please enter an email address.");
      return false;
    }
    if (!EMAIL_RE.test(val)) {
      setError(fields.email, "Enter a valid email, e.g. name@example.com");
      return false;
    }
    setError(fields.email, "");
    return true;
  }

  function validatePhone() {
    var val = fields.phone.input.value.trim();
    if (!val) {
      setError(fields.phone, "Please enter a phone number.");
      return false;
    }
    if (!PHONE_DIGITS_RE.test(val)) {
      setError(fields.phone, "Digits only, no spaces or symbols.");
      return false;
    }
    setError(fields.phone, "");
    return true;
  }

  function validateMessage() {
    var val = fields.message.input.value.trim();
    if (!val) {
      setError(fields.message, "Please write a short message.");
      return false;
    }
    setError(fields.message, "");
    return true;
  }

  // live validation as the person types / leaves a field
  fields.name.input.addEventListener("blur", validateName);
  fields.email.input.addEventListener("blur", validateEmail);
  fields.phone.input.addEventListener("blur", validatePhone);
  fields.message.input.addEventListener("blur", validateMessage);

  // strip non-digits from phone as the person types, so the check stays friendly
  fields.phone.input.addEventListener("input", function () {
    fields.phone.input.value = fields.phone.input.value.replace(/[^0-9]/g, "");
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var validName = validateName();
    var validEmail = validateEmail();
    var validPhone = validatePhone();
    var validMessage = validateMessage();
    var allValid = validName && validEmail && validPhone && validMessage;

    status.classList.remove("show", "success", "error");

    if (!allValid) {
      status.textContent = "Please fix the highlighted fields before sending.";
      status.classList.add("show", "error");
      var firstInvalid = form.querySelector(".invalid input, .invalid textarea");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // No backend is connected — simulate a successful send.
    var name = fields.name.input.value.trim();
    status.textContent = "Thanks, " + name + "! Your message has been received. I'll reply to " + fields.email.input.value.trim() + " soon.";
    status.classList.add("show", "success");
    form.reset();
  });
})();
