document.addEventListener("DOMContentLoaded", function() {

  // ---- Animación de secciones al hacer scroll ----
  const sections = document.querySelectorAll('.fade-in');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });


  // ---- Botón para volver arriba (Back to Top) ----
  const backToTopButton = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  });

  backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ---- Funcionalidad del Formulario de Contacto ----
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const formData = {
          nombre: document.getElementById('nombre').value,
          email: document.getElementById('email').value,
          mensaje: document.getElementById('mensaje').value
      };

      formStatus.textContent = 'Enviando...';
      formStatus.style.color = '#333';

      fetch('http://localhost:3000/send-message', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          console.log('Success:', data);
          formStatus.textContent = '¡Mensaje enviado con éxito!';
          formStatus.style.color = '#0a9396';
          contactForm.reset();
          setTimeout(() => { formStatus.textContent = ''; }, 5000);
      })
      .catch((error) => {
          console.error('Error:', error);
          formStatus.textContent = 'Error al enviar el mensaje. Inténtalo de nuevo.';
          formStatus.style.color = '#d9534f';
          setTimeout(() => { formStatus.textContent = ''; }, 5000);
      });
  });
});