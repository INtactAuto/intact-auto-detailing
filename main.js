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

// Booking form
const form = document.getElementById('bookingForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending...';
  status.textContent = '';

  const data = new FormData(form);

  // Flag first-time discount in the submission
  if (document.getElementById('firstTime').checked) {
    data.append('Discount', '10% first-time discount claimed — verify phone before applying');
  }

  try {
    const res = await fetch('https://formspree.io/f/xjgdgpea', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      status.style.color = '#166534';
      status.textContent = '✅ Booking sent! We\'ll be in touch within a few hours.';
      form.reset();
    } else {
      const json = await res.json();
      const msg = json.errors ? json.errors.map(e => e.message).join(', ') : 'Unknown error';
      status.style.color = '#991b1b';
      status.textContent = '❌ ' + msg + ' — or call us at 501-400-5014.';
    }
  } catch (err) {
    status.style.color = '#991b1b';
    status.textContent = '❌ Network error. Please call us at 501-400-5014 to book.';
  }

  btn.disabled = false;
  btn.textContent = 'Send Booking Request';
});
