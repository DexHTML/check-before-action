window.METRIKA_ID = 110429323;

(function initMetrika() {
  if (!window.METRIKA_ID) return;

  window.ym = window.ym || function ymFallback() {
    (window.ym.a = window.ym.a || []).push(arguments);
  };
  window.ym.l = 1 * new Date();

  window.ym(window.METRIKA_ID, 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://mc.yandex.ru/metrika/tag.js';
  document.head.appendChild(script);
})();

function trackEvent(name, params = {}) {
  if (window.ym && window.METRIKA_ID) {
    window.ym(window.METRIKA_ID, 'reachGoal', name, params);
  }
  console.info('[event]', name, params);
}

function copyTextFromElement(elementId, eventName = 'copy_text') {
  const element = document.getElementById(elementId);
  if (!element) return;

  const text = element.value || element.innerText || '';
  navigator.clipboard.writeText(text).then(() => {
    trackEvent(eventName);
    const button = document.querySelector(`[data-copy-target="${elementId}"]`);
    if (button) {
      const oldText = button.textContent;
      button.textContent = 'Скопировано';
      setTimeout(() => { button.textContent = oldText; }, 1800);
    }
  }).catch(() => {
    alert('Не получилось скопировать автоматически. Выделите текст вручную.');
  });
}

document.addEventListener('click', (event) => {
  const target = event.target.closest('[data-track]');
  if (target) {
    trackEvent(target.dataset.track, {
      href: target.getAttribute('href') || '',
      text: target.textContent.trim().slice(0, 80)
    });
  }

  const copyButton = event.target.closest('[data-copy-target]');
  if (copyButton) {
    copyTextFromElement(copyButton.dataset.copyTarget, copyButton.dataset.track || 'copy_text');
  }
});
