/**
 * Módulo de Guías Interactivas de Configuración
 * Manejo dinámico de pestañas accesibles (WhatsApp, Google, Facebook/IG, TikTok, Bancos)
 * y marcado interactivo de casilleros de progreso (Checkboxes).
 */

export function initSteps() {
  const tabButtons = document.querySelectorAll('.guide-tab-btn');
  const panels = document.querySelectorAll('[role="tabpanel"]');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPanelId = btn.getAttribute('aria-controls');

      // Desactivar todos los botones de pestañas
      tabButtons.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });

      // Ocultar todos los paneles
      panels.forEach(p => {
        p.setAttribute('hidden', '');
      });

      // Activar el botón seleccionado y mostrar su panel
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      const targetPanel = document.getElementById(targetPanelId);
      if (targetPanel) {
        targetPanel.removeAttribute('hidden');
      }
    });
  });

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
