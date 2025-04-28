(function() {
  // Initialize EmailJS with your public key
  emailjs.init("WL1hcZy6bNApIntuV");

  // Initialize AOS (Animate On Scroll)
  AOS.init({
      duration: 1000,
      once: false
  });

  // Dark Mode Toggle
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
      // Toggle dark mode class
      document.body.classList.toggle('dark-mode');
      
      // Re-initialize AOS so animations are available in dark mode
      AOS.init({
          duration: 1000,
          once: false
      });
  });

  // Contact Button Scroll
  const contactBtn = document.getElementById('contact-btn');
  if (contactBtn) {
      contactBtn.addEventListener('click', () => {
          const contactSection = document.getElementById('contact');
          if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
          }
      });
  }

  // Mobile Navigation Toggle (for screens below 768px)
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.querySelector('nav');
  if (navToggle) {
      navToggle.addEventListener('change', () => {
          if (navToggle.checked) {
              nav.classList.add('active');
          } else {
              nav.classList.remove('active');
          }
      });
  }

  // Typing Animation for "typing-container"
  const typingText = document.getElementById('typing-text');
  const phrases = ["About"];
  let phraseIndex = 0;
  let letterIndex = 0;
  let currentPhrase = "";
  let isDeleting = false;

  function type() {
      if (phraseIndex >= phrases.length) {
          phraseIndex = 0;
      }
      currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
          typingText.textContent = currentPhrase.substring(0, letterIndex--);
          if (letterIndex < 0) {
              isDeleting = false;
              phraseIndex++;
              setTimeout(type, 500);
          } else {
              setTimeout(type, 50);
          }
      } else {
          typingText.textContent = currentPhrase.substring(0, letterIndex++);
          if (letterIndex > currentPhrase.length) {
              isDeleting = true;
              setTimeout(type, 1500);
          } else {
              setTimeout(type, 150);
          }
      }
  }

  // Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
          backToTopBtn.classList.add('show');
      } else {
          backToTopBtn.classList.remove('show');
      }
  });

  backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Start typing animation on DOM load
  document.addEventListener('DOMContentLoaded', type);

  // View CV Option: Open PDF in a new tab
  const viewCVBtn = document.getElementById('view-cv');
  if (viewCVBtn) {
      viewCVBtn.addEventListener('click', () => {
          window.open('Thirumalaivasan_CV.pdf', '_blank');
      });
  }

  // Handle Contact Form Submission with EmailJS
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
      contactForm.addEventListener('submit', function(event) {
          event.preventDefault();

          // Collect form data
          const formData = {
              name: this.name.value.trim(),
              email: this.email.value.trim(),
              subject: this.subject.value.trim(),
              message: this.message.value.trim()
          };

          // Validate form data
          if (!formData.name || !formData.email || !formData.subject || !formData.message) {
              alert('Please fill in all fields.');
              return;
          }

          // Send the contact form email
          emailjs.send('service_s67nf9t', 'template_rf4c01r', formData)
              .then(function(response) {
                  console.log('Contact form email sent!', response.status, response.text);

                  // Send auto-reply email to the user
                  const autoReplyData = {
                      to_name: formData.name,
                      to_email: formData.email,
                      reply_message: 'Thank you for contacting Thirumalaivasan K N! I have received your message and will get back to you soon.'
                  };

                  return emailjs.send('service_s67nf9t', 'template_qaeie1s', autoReplyData);
              })
              .then(function(response) {
                  console.log('Auto-reply email sent!', response.status, response.text);
                  alert('Your message has been sent successfully! You will receive a automated reply mail shortly.');
                  contactForm.reset();
              })
              .catch(function(error) {
                  console.error('Failed to send email:', error);
                  let errorMessage = 'There was an error sending your message. Please try again later.';
                  if (error.text) {
                      errorMessage += `\nDetails: ${error.text}`;
                  }
                  alert(errorMessage);
              });
      });
  }
})();