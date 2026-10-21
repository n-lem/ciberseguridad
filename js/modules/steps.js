/**
 * Módulo de Guías Interactivas de Configuración
 * Manejo de pestañas Android / iPhone y marcado de casilleros de progreso.
 */

export function initSteps() {
  const tabAndroid = document.getElementById('tab-android');
  const tabIphone = document.getElementById('tab-iphone');
  const panelAndroid = document.getElementById('panel-android');
  const panelIphone = document.getElementById('panel-iphone');

  if (tabAndroid && tabIphone && panelAndroid && panelIphone) {
    tabAndroid.addEventListener('click', () => {
      tabAndroid.classList.add('is-active');
      tabAndroid.setAttribute('aria-selected', 'true');
      tabIphone.classList.remove('is-active');
      tabIphone.setAttribute('aria-selected', 'false');

      panelAndroid.removeAttribute('hidden');
      panelIphone.setAttribute('hidden', '');
    });

    tabIphone.addEventListener('click', () => {
      tabIphone.classList.add('is-active');
      tabIphone.setAttribute('aria-selected', 'true');
      tabAndroid.classList.remove('is-active');
      tabAndroid.setAttribute('aria-selected', 'false');

      panelIphone.removeAttribute('hidden');
      panelAndroid.setAttribute('hidden', '');
    });
  }

  // Interacción en checkboxes para resaltar visualmente el paso completado
  const checkboxes = document.querySelectorAll('.step-checkbox');
  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      const stepItem = cb.closest('.step-item');
      if (!stepItem) return;

      if (cb.checked) {
        stepItem.classList.add('is-completed');
      } else {
        stepItem.classList.remove('is-completed');
      }
    });
  });
}
