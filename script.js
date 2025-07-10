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

  // ---- Funcionalidad del Formulario de Contacto (Versión para Formspree) ----
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const form = e.target;
      const data = new FormData(form);
      
      formStatus.textContent = 'Enviando...';
      formStatus.style.color = '#333';

      fetch(form.action, {
          method: form.method,
          body: data,
          headers: {
              'Accept': 'application/json'
          }
      }).then(response => {
          if (response.ok) {
              formStatus.textContent = "¡Gracias por tu mensaje!";
              formStatus.style.color = '#0a9396';
              form.reset();
              setTimeout(() => { formStatus.textContent = ''; }, 5000);
          } else {
              response.json().then(data => {
                  if (Object.hasOwn(data, 'errors')) {
                      formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                  } else {
                      formStatus.textContent = "Oops! Hubo un problema al enviar tu formulario.";
                  }
                  formStatus.style.color = '#d9534f';
                  setTimeout(() => { formStatus.textContent = ''; }, 5000);
              })
          }
      }).catch(error => {
          formStatus.textContent = "Oops! Hubo un problema al enviar tu formulario.";
          formStatus.style.color = '#d9534f';
          setTimeout(() => { formStatus.textContent = ''; }, 5000);
      });
  });
});
