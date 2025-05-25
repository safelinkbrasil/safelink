// script.js

// 1. Fade-in suave do conteúdo ao carregar a página
window.addEventListener('load', () => {
  document.body.style.opacity = 0;
  let op = 0;
  const fadeIn = setInterval(() => {
    if (op >= 1) {
      clearInterval(fadeIn);
    }
    document.body.style.opacity = op;
    op += 0.05;
  }, 50);
});

// 2. Scroll suave para âncoras internas
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if(target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// 3. Animação com fade e slide ao entrar na viewport usando Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Seleciona os elementos que devem animar
document.querySelectorAll('.card, .sobre, .estatisticas, .contato').forEach(el => {
  el.classList.add('before-animate');  // estado inicial: invisível e deslocado
  observer.observe(el);
});

window.addEventListener('scroll', () => {
  if(window.pageYOffset > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

// Função para animar o contador
function animateCounter(el) {
  const target = +el.getAttribute('data-target');
  const duration = 2000; // duração da animação em ms
  let start = 0;
  let startTime = null;

  function update(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const current = Math.min(Math.floor(progress / duration * target), target);
    el.textContent = current;

    if (progress < duration) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target; // garante que finalize no valor certo
    }
  }

  requestAnimationFrame(update);
}

// Detectar quando a seção das estatísticas está visível
function handleScroll() {
  const statsSection = document.querySelector('.estatisticas');
  const statsPosition = statsSection.getBoundingClientRect().top;
  const screenPosition = window.innerHeight;

  if (statsPosition < screenPosition) {
    const counters = document.querySelectorAll('.estatisticas h3');
    counters.forEach(counter => animateCounter(counter));

    // Remove o listener para não repetir a animação ao rolar
    window.removeEventListener('scroll', handleScroll);
  }
}

window.addEventListener('scroll', handleScroll);

// carrosel pagina serviços

const carrossel = document.querySelector('.carrossel-wrapper');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

const scrollAmount = 170; // quanto desliza a cada clique (ajuste conforme o tamanho do item + gap)

btnPrev.addEventListener('click', () => {
  carrossel.scrollBy({
    left: -scrollAmount,
    behavior: 'smooth'
  });
});

btnNext.addEventListener('click', () => {
  carrossel.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
});

