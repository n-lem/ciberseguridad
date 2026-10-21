/**
 * Módulo de Viralización Preventiva por WhatsApp
 * Genera enlaces directos `whatsapp://send` o `https://api.whatsapp.com/send`
 * con mensajes prearmados para reenviar a familiares o grupos de vecinos.
 */

export function initShare() {
  const shareButtons = document.querySelectorAll('.btn-action--whatsapp');

  shareButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      const title = btn.getAttribute('data-share-title') || 'Alerta de Seguridad Comunitaria';
      const text = btn.getAttribute('data-share-text') || 'Comparto esta guía útil para prevenir estafas telefónicas:';
      const currentUrl = window.location.href.split('#')[0];

      const fullMessage = `🛡️ *${title}*\n\n${text}\n\n👉 Leelo completo acá: ${currentUrl}`;
      const encodedMsg = encodeURIComponent(fullMessage);

      // Usar la URL universal de WhatsApp (funciona en móvil y WhatsApp Web en PC)
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMsg}`;
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  });
}
