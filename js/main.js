/**
 * Punto de entrada principal (ES6 Modules)
 * Plataforma Comunitaria de Prevención de Estafas Virtuales
 * Prácticas Digitales & NTICx - José C. Paz
 */

import { initAccessibility } from './modules/accessibility.js';
import { initTTS } from './modules/tts.js';
import { initShare } from './modules/share.js';
import { initSteps } from './modules/steps.js';

document.addEventListener('DOMContentLoaded', () => {
  initAccessibility();
  initTTS();
  initShare();
  initSteps();

  console.log('🛡️ Plataforma Comunitaria de Ciberseguridad inicializada correctamente.');
});
