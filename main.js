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

// Formspree Ajax handles form submission via data attributes.
// Add first-time discount note as a hidden field when checkbox is checked.
document.getElementById('bookingForm').addEventListener('submit', function () {
  const firstTime = document.getElementById('firstTime').checked;
  const phone = document.getElementById('phone').value;
  let hidden = document.getElementById('discountNote');
  if (!hidden) {
    hidden = document.createElement('input');
    hidden.type = 'hidden';
    hidden.name = '_discount_note';
    hidden.id = 'discountNote';
    this.appendChild(hidden);
  }
  hidden.value = firstTime
    ? '$15 first-time discount claimed — verify phone: ' + phone
    : '';
});
