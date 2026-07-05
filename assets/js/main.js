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
