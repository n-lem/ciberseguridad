/**
 * Módulo de Lectura en Voz Alta (Text-To-Speech)
 * Implementa Web Speech API para lectura accesible en español rioplatense.
 */

let synth = null;
let currentUtterance = null;
let currentActiveBtn = null;
let preferredVoice = null;

if ('speechSynthesis' in window) {
  synth = window.speechSynthesis;
}

/**
 * Busca y asigna la mejor voz en español disponible
 */
function findSpanishVoice() {
  if (!synth) return null;
  const voices = synth.getVoices();
  // Priorizar español de Argentina (es-AR), luego Latinoamérica (es-419), luego cualquier español
  preferredVoice =
    voices.find(v => v.lang === 'es-AR') ||
    voices.find(v => v.lang.includes('es-419')) ||
    voices.find(v => v.lang.startsWith('es')) ||
    null;
  return preferredVoice;
}

/**
 * Detiene la reproducción actual y restablece los botones
 */
export function stopSpeaking() {
  if (synth && synth.speaking) {
    synth.cancel();
  }
  if (currentActiveBtn) {
    currentActiveBtn.classList.remove('is-speaking');
    const labelSpan = currentActiveBtn.querySelector('span:not([aria-hidden="true"])') || currentActiveBtn;
    if (labelSpan && labelSpan.textContent) {
      labelSpan.textContent = labelSpan.textContent.replace('Pausar', 'Escuchar');
    }
    currentActiveBtn = null;
  }
}

/**
 * Lee el contenido de texto de un elemento por su ID o selector
 * @param {string} targetId
 * @param {HTMLButtonElement} btnElement
 */
export function speakElementContent(targetId, btnElement) {
  if (!synth) {
    alert('Tu navegador no tiene activada la lectura de voz. Te recomendamos usar Google Chrome o Microsoft Edge.');
    return;
  }

  // Si ya está hablando sobre este mismo botón, pausar/detener
  if (currentActiveBtn === btnElement && synth.speaking) {
    stopSpeaking();
    return;
  }

  // Detener cualquier otra lectura activa
  stopSpeaking();

  const targetEl = document.getElementById(targetId);
  if (!targetEl) return;

  // Extraer el texto limpio descartando botones internos
  const clone = targetEl.cloneNode(true);
  const buttonsInside = clone.querySelectorAll('button, .btn-action, .scam-card__actions');
  buttonsInside.forEach(b => b.remove());
  const textToRead = clone.textContent.trim().replace(/\s+/g, ' ');

  if (!textToRead) return;

  currentUtterance = new SpeechSynthesisUtterance(textToRead);
  currentUtterance.rate = 0.9;  // Velocidad un poco más pausada, óptima para adultos mayores
  currentUtterance.pitch = 1.0;

  if (!preferredVoice) {
    findSpanishVoice();
  }
  if (preferredVoice) {
    currentUtterance.voice = preferredVoice;
  }

  currentActiveBtn = btnElement;
  currentActiveBtn.classList.add('is-speaking');

  currentUtterance.onend = () => {
    stopSpeaking();
  };

  currentUtterance.onerror = () => {
    stopSpeaking();
  };

  synth.speak(currentUtterance);
}

/**
 * Inicializa todos los botones con data-speech-target
 */
export function initTTS() {
  if (synth) {
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = findSpanishVoice;
    }
    findSpanishVoice();
  }

  const speechButtons = document.querySelectorAll('[data-speech-target]');
  speechButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-speech-target');
      if (targetId) {
        speakElementContent(targetId, btn);
      }
    });
  });
}
