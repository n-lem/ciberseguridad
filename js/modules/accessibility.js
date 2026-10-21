/**
 * Módulo de Accesibilidad Gerontológica
 * Control dinámico de escala tipográfica (A+ / A-) y Modo Alto Contraste con persistencia en localStorage.
 */

const STORAGE_KEY_FACTOR = 'ciberseguridad_font_factor';
const STORAGE_KEY_THEME = 'ciberseguridad_theme';

const MIN_FACTOR = 0.85;
const MAX_FACTOR = 1.6;
const STEP_FACTOR = 0.15;

let currentFactor = parseFloat(localStorage.getItem(STORAGE_KEY_FACTOR)) || 1;

/**
 * Aplica el factor de tamaño de fuente al elemento raíz
 * @param {number} factor
 */
function applyFontFactor(factor) {
  currentFactor = Math.min(Math.max(factor, MIN_FACTOR), MAX_FACTOR);
  document.documentElement.style.setProperty('--font-factor', currentFactor.toString());
  localStorage.setItem(STORAGE_KEY_FACTOR, currentFactor.toString());
}

/**
 * Alterna el modo de alto contraste (fondo negro, letras amarillas/blancas)
 * @param {HTMLButtonElement} toggleBtn
 */
function toggleHighContrast(toggleBtn) {
  const isHighContrast = document.documentElement.getAttribute('data-theme') === 'high-contrast';
  const newTheme = isHighContrast ? 'standard' : 'high-contrast';

  if (newTheme === 'high-contrast') {
    document.documentElement.setAttribute('data-theme', 'high-contrast');
    toggleBtn.setAttribute('aria-pressed', 'true');
    toggleBtn.classList.add('access-btn--active');
  } else {
    document.documentElement.removeAttribute('data-theme');
    toggleBtn.setAttribute('aria-pressed', 'false');
    toggleBtn.classList.remove('access-btn--active');
  }

  localStorage.setItem(STORAGE_KEY_THEME, newTheme);
}

/**
 * Inicializa los controles de la barra de accesibilidad
 */
export function initAccessibility() {
  const btnDecrease = document.getElementById('btn-font-decrease');
  const btnIncrease = document.getElementById('btn-font-increase');
  const btnContrast = document.getElementById('btn-contrast-toggle');
  const btnPrintGuide = document.getElementById('btn-print-guide');
  const btnPrintSemaforo = document.getElementById('btn-print-semaforo');

  // Restaurar tamaño de letra guardado
  if (currentFactor !== 1) {
    applyFontFactor(currentFactor);
  }

  // Restaurar tema guardado
  const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
  if (savedTheme === 'high-contrast' && btnContrast) {
    document.documentElement.setAttribute('data-theme', 'high-contrast');
    btnContrast.setAttribute('aria-pressed', 'true');
    btnContrast.classList.add('access-btn--active');
  }

  // Event Listeners
  if (btnDecrease) {
    btnDecrease.addEventListener('click', () => {
      applyFontFactor(currentFactor - STEP_FACTOR);
    });
  }

  if (btnIncrease) {
    btnIncrease.addEventListener('click', () => {
      applyFontFactor(currentFactor + STEP_FACTOR);
    });
  }

  if (btnContrast) {
    btnContrast.addEventListener('click', () => {
      toggleHighContrast(btnContrast);
    });
  }

  if (btnPrintGuide) {
    btnPrintGuide.addEventListener('click', () => {
      window.print();
    });
  }

  if (btnPrintSemaforo) {
    btnPrintSemaforo.addEventListener('click', () => {
      window.print();
    });
  }
}
