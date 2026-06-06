// Mobile nav toggle
document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

// Close nav on link click (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});

document.getElementById('bookingForm').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const status = document.getElementById('formStatus');
  const firstTime = document.getElementById('firstTime').checked;
  const phone = document.getElementById('phone').value;

  status.textContent = 'Sending...';

  const data = new FormData(form);
  if (firstTime) {
    data.append('_discount', '$15 first-time customer discount claimed — verify phone: ' + phone);
  }

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      status.textContent = firstTime
        ? `✅ Booking sent! We'll be in touch shortly. (First-time discount will be verified via phone.)`
        : `✅ Booking sent! We'll be in touch within a few hours.`;
      form.reset();
    } else {
      status.textContent = '❌ Something went wrong. Please call us directly to book.';
    }
  } catch {
    status.textContent = '❌ Network error. Please call us directly to book.';
  }
});
