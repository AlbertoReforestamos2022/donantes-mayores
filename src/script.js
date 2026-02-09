
  document.addEventListener('DOMContentLoaded', function() {
      // Inicializar todas las funcionalidades
      initNavigation();
      initCarousel();
      initCounters();
      initVideoObserver();
      initSmoothScroll();
      initFormSubmission();
  });

  // ===================================
  // NAVEGACIÓN
  // ===================================

  function initNavigation() {
      const nav = document.querySelector('.navegacion-principal');
      const logoSinScroll = document.querySelector('.logo-sin-scroll');
      const logoConScroll = document.querySelector('.logo-con-scroll');
      
      
      // Efecto de scroll en la navegación
      window.addEventListener('scroll', function() {
          if (window.scrollY > 350) {
              nav.style.backgroundColor = 'rgba(255, 255, 255, 1)';
              nav.style.padding = '5px 15px';
              
              if (logoSinScroll && logoConScroll) {
                  logoSinScroll.classList.add('d-none');
                  logoConScroll.classList.remove('d-none');
              }
          } else {
              nav.style.backgroundColor = 'transparent';
              nav.style.padding = '10px 15px';
              
              if (logoSinScroll && logoConScroll) {
                  // logoSinScroll.classList.remove('d-none');
                  logoConScroll.classList.add('d-none');
              }
          }
      });

      // Cerrar menú móvil al hacer clic en un enlace
      const navLinks = document.querySelectorAll('.link-nav-principal');
      const navbarCollapse = document.querySelector('.navbar-collapse');
      
      navLinks.forEach(link => {
          link.addEventListener('click', () => {
              if (window.innerWidth < 992) {
                  const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                      toggle: false
                  });
                  bsCollapse.hide();
              }
          });
      });
  }

  // ===================================
  // CARRUSEL DE ALIADOS CON SWIPER
  // ===================================

  function initCarousel() {
      const swiper = new Swiper('.aliados-swiper', {
          // Configuración básica
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          autoplay: {
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
          },
          
          // Paginación
          pagination: {
              el: '.swiper-pagination',
              clickable: true,
              dynamicBullets: true,
          },
          
          // Navegación con flechas
          navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
          },
          
          // Responsive breakpoints
          breakpoints: {
              // Cuando el ancho es >= 640px
              640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
              },
              // Cuando el ancho es >= 768px
              768: {
                  slidesPerView: 3,
                  spaceBetween: 30,
              },
              // Cuando el ancho es >= 1024px
              1024: {
                  slidesPerView: 4,
                  spaceBetween: 40,
              },
          },
          
          // Efectos
          effect: 'slide',
          speed: 600,
          
          // Accesibilidad
          a11y: {
              prevSlideMessage: 'Diapositiva anterior',
              nextSlideMessage: 'Siguiente diapositiva',
          },
      });

      // Pausar autoplay cuando el usuario interactúa
      const swiperContainer = document.querySelector('.aliados-swiper');
      if (swiperContainer) {
          swiperContainer.addEventListener('mouseenter', () => {
              swiper.autoplay.stop();
          });
          
          swiperContainer.addEventListener('mouseleave', () => {
              swiper.autoplay.start();
          });
      }
  }

  // ===================================
  // ANIMACIÓN DE CONTADORES
  // ===================================

  function initCounters() {
      const counters = document.querySelectorAll('[data-target]');
      const speed = 2000; // Duración de la animación en ms
      
      const observerOptions = {
          threshold: 0.5,
          rootMargin: '0px'
      };
      
      const counterObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  const counter = entry.target;
                  const target = +counter.getAttribute('data-target');
                  
                  if (counter.classList.contains('animated')) return;
                  
                  animateCounter(counter, target, speed);
                  counter.classList.add('animated');
                  
                  counterObserver.unobserve(counter);
              }
          });
      }, observerOptions);
      
      counters.forEach(counter => counterObserver.observe(counter));
  }

  function animateCounter(element, target, duration) {
      let startTime = null;
      const startValue = 0;
      
      function animation(currentTime) {
          if (!startTime) startTime = currentTime;
          const progress = Math.min((currentTime - startTime) / duration, 1);
          
          // Easing function (ease-out)
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentValue = Math.floor(easeOut * (target - startValue) + startValue);
          
          element.textContent = currentValue;
          
          if (progress < 1) {
              requestAnimationFrame(animation);
          } else {
              element.textContent = target;
          }
      }
      
      requestAnimationFrame(animation);
  }

  // ===================================
  // VIDEO INSTITUCIONAL - OBSERVER
  // ===================================
  function initVideoObserver() {
      const videoInstitucional = document.querySelector('#videoInstitucional');
      
      if (!videoInstitucional) return;
      
      const observerOptions = {
          threshold: 0.5
      };
      
      const videoObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  videoInstitucional.play().catch(error => {
                      console.log('Error al reproducir video:', error);
                  });
              } else {
                  videoInstitucional.pause();
              }
          });
      }, observerOptions);
      
      videoObserver.observe(videoInstitucional);
  }

  // ===================================
  // SMOOTH SCROLL
  // ===================================

  function initSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function(e) {
              const href = this.getAttribute('href');
              
              // Ignorar enlaces vacíos o solo con #
              if (href === '#' || href === '') {
                  e.preventDefault();
                  return;
              }
              
              const target = document.querySelector(href);
              
              if (target) {
                  e.preventDefault();
                  
                  const navHeight = document.querySelector('.navegacion-principal').offsetHeight;
                  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                  
                  window.scrollTo({
                      top: targetPosition,
                      behavior: 'smooth'
                  });
              }
          });
      });
  }

  // ===================================
  // FORMULARIO DE CONTACTO
  // ===================================

  function initFormSubmission() {
      const form = document.getElementById('formulario-donantes-mayores');
      
      if (!form) return;
      
      form.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Validar formulario
          if (!form.checkValidity()) {
              e.stopPropagation();
              form.classList.add('was-validated');
              return;
          }
          
          // Recoger datos del formulario
          const formData = new FormData(form);
          const data = Object.fromEntries(formData);
          
          console.log('Formulario enviado:', data);
          
          // Mostrar mensaje de éxito
          showFormMessage('¡Gracias por tu interés! Nos pondremos en contacto contigo a la brevedad posible.', 'success');
          
          // Limpiar formulario
          form.reset();
          form.classList.remove('was-validated');
          
          // Aquí puedes agregar la lógica para enviar los datos al servidor
          // Por ejemplo, usando fetch o XMLHttpRequest
          /*
          fetch('/api/contacto', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data)
          })
          .then(response => response.json())
          .then(data => {
              showFormMessage('¡Gracias por tu interés! Nos pondremos en contacto contigo a la brevedad posible.', 'success');
              form.reset();
          })
          .catch(error => {
              showFormMessage('Hubo un error al enviar el formulario. Por favor, intenta nuevamente.', 'error');
          });
          */
      });
  }

  function showFormMessage(message, type) {
      const messageElement = document.querySelector('.mensaje-status-formulario');
      
      if (!messageElement) return;
      
      messageElement.textContent = message;
      messageElement.classList.remove('text-muted', 'text-success', 'text-danger');
      
      if (type === 'success') {
          messageElement.classList.add('text-success');
      } else if (type === 'error') {
          messageElement.classList.add('text-danger');
      }
      
      // Volver al estado original después de 5 segundos
      setTimeout(() => {
          messageElement.textContent = 'Los datos proporcionados serán tratados de forma confidencial conforme a nuestra política de privacidad.';
          messageElement.classList.remove('text-success', 'text-danger');
          messageElement.classList.add('text-muted');
      }, 5000);
  }

  // ===================================
  // ANIMACIONES DE ENTRADA
  // ===================================

  // Observer para animaciones de entrada
  const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
          }
      });
  }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
  });

  // Aplicar observer a elementos con animación
  document.addEventListener('DOMContentLoaded', () => {
      const animatedElements = document.querySelectorAll('.slide-in-left, .slide-in-right, .benefit-card, .timeline-item');
      
      animatedElements.forEach(el => {
          el.style.opacity = '0';
          el.style.transform = 'translateY(30px)';
          el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          animationObserver.observe(el);
      });
  });

  // ===================================
  // UTILIDADES ADICIONALES
  // ===================================

  // Detectar tamaño de pantalla y ajustar comportamientos
  window.addEventListener('resize', debounce(() => {
      // Aquí puedes agregar lógica adicional para resize
      console.log('Ventana redimensionada');
  }, 250));

  // Función debounce para optimizar eventos
  function debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
          const later = () => {
              clearTimeout(timeout);
              func(...args);
          };
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
      };
  }

  // Lazy loading para imágenes (opcional)
  if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  const img = entry.target;
                  if (img.dataset.src) {
                      img.src = img.dataset.src;
                      img.removeAttribute('data-src');
                      imageObserver.unobserve(img);
                  }
              }
          });
      });
      
      document.querySelectorAll('img[data-src]').forEach(img => {
          imageObserver.observe(img);
      });
  }
