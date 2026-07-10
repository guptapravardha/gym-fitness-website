/* =========================================================
   CONTACT.JS — form validation
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if(!form) return;
  const successMsg = document.getElementById('form-success');

  const fields = {
    name: { el: document.getElementById('c-name'), validate: v => v.trim().length >= 2, msg: 'Please enter your full name.' },
    email: { el: document.getElementById('c-email'), validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Please enter a valid email address.' },
    phone: { el: document.getElementById('c-phone'), validate: v => v.trim() === '' || /^[\d\s\-\+\(\)]{7,}$/.test(v), msg: 'Please enter a valid phone number.' },
    message: { el: document.getElementById('c-message'), validate: v => v.trim().length >= 10, msg: 'Message should be at least 10 characters.' }
  };

  function showError(key, show){
    const field = fields[key];
    const errorEl = field.el.parentElement.querySelector('.field-error');
    field.el.classList.toggle('invalid', show);
    if(errorEl) errorEl.style.display = show ? 'block' : 'none';
  }

  Object.keys(fields).forEach(key => {
    fields[key].el.addEventListener('input', () => {
      const valid = fields[key].validate(fields[key].el.value);
      if(valid) showError(key, false);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let allValid = true;

    Object.keys(fields).forEach(key => {
      const valid = fields[key].validate(fields[key].el.value);
      showError(key, !valid);
      if(!valid) allValid = false;
    });

    if(allValid){
      form.reset();
      successMsg.classList.add('show');
      setTimeout(() => successMsg.classList.remove('show'), 4000);
    } else {
      form.classList.add('shake');
      setTimeout(() => form.classList.remove('shake'), 500);
    }
  });
});
