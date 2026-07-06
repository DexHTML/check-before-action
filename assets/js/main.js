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

(function injectStructuredData() {
  const faqByPath = {
    '/check-before-action/pages/perevel-dengi-moshennikam.html': {
      name: 'Что делать, если перевёл деньги мошенникам',
      questions: [
        ['Что делать в первую очередь, если перевёл деньги мошенникам?', 'Не переводите больше денег, свяжитесь с банком по официальному номеру, сохраните чек, переписку, реквизиты и данные о получателе.'],
        ['Можно ли вернуть деньги после перевода мошенникам?', 'Это зависит от способа перевода, сроков обращения, правил банка и обстоятельств операции. Чем быстрее вы обратитесь в банк и сохраните доказательства, тем выше шанс на разбор ситуации.'],
        ['Нужно ли продолжать переписку с мошенником?', 'Лучше не вести долгих переговоров. Сохраните доказательства и не отправляйте новые суммы за отмену, комиссию или возврат денег.']
      ]
    },
    '/check-before-action/pages/skazal-kod-iz-sms.html': {
      name: 'Что делать, если сказал код из СМС',
      questions: [
        ['Что делать, если я сказал код из СМС?', 'Прекратите разговор, не называйте новые коды, проверьте операции и срочно свяжитесь с банком или сервисом, от которого был код.'],
        ['Если я назвал код, но деньги ещё не списались, нужно ли что-то делать?', 'Да. Код мог открыть доступ к операции, аккаунту или изменению настроек. Нужно быстро проверить операции, сессии и безопасность аккаунтов.'],
        ['Можно ли доверять звонку, если номер похож на банковский?', 'Нет. Номер может быть похожим или подменённым. Безопаснее завершить разговор и перезвонить по официальному номеру.']
      ]
    },
    '/check-before-action/pages/vvel-dannye-karty.html': {
      name: 'Что делать, если ввёл данные карты на подозрительном сайте',
      questions: [
        ['Что делать, если ввёл данные карты на подозрительном сайте?', 'Закройте сайт, не вводите новые коды, проверьте операции, свяжитесь с банком и обсудите блокировку карты или лимитов.'],
        ['Нужно ли блокировать карту после ввода данных?', 'Если вы ввели полный набор данных карты или код подтверждения, лучше срочно обсудить блокировку с банком.'],
        ['Что сохранить после ввода карты на подозрительном сайте?', 'Сохраните ссылку, скриншоты сайта, переписку, время события и данные операции, если списание уже произошло.']
      ]
    },
    '/check-before-action/pages/prislali-ssylku-na-dostavku.html': {
      name: 'Прислали ссылку на доставку или оплату — как проверить',
      questions: [
        ['Безопасно ли вводить карту по ссылке на доставку из чата?', 'Если ссылку прислал незнакомец в чате, это риск. Лучше открыть официальный сайт или приложение вручную и проверить сделку там.'],
        ['Почему покупатель может уводить в мессенджер?', 'В мессенджере проще прислать фишинговую ссылку, торопить человека и обходить защиту площадки.'],
        ['Что делать, если я уже ввёл карту по ссылке?', 'Проверьте операции, свяжитесь с банком и при необходимости заблокируйте карту. Сохраните ссылку и скриншоты.']
      ]
    },
    '/check-before-action/pages/zvonyat-iz-banka-prosyat-perevesti-na-bezopasnyy-schet.html': {
      name: 'Звонят из банка и просят перевести деньги на безопасный счёт',
      questions: [
        ['Что делать, если звонят из банка и просят перевести деньги на безопасный счёт?', 'Не переводите деньги. Завершите разговор и перезвоните в банк по номеру с карты или официального сайта.'],
        ['Может ли безопасный счёт быть настоящим?', 'Просьба перевести деньги на безопасный, резервный или защитный счёт по телефону является сильным красным флагом. Проверяйте всё только через официальный канал банка.'],
        ['Что делать, если я уже начал перевод?', 'Остановитесь, не подтверждайте новые действия и сразу свяжитесь с банком по официальному номеру.']
      ]
    },
    '/check-before-action/pages/ustanovil-prilozhenie-po-prosbe-zvonyashchego.html': {
      name: 'Установил приложение по просьбе звонящего — что делать',
      questions: [
        ['Что делать, если установил приложение по просьбе звонящего?', 'Отключите интернет на устройстве, не открывайте банковские приложения, свяжитесь с банком с другого устройства и проверьте операции.'],
        ['Достаточно ли удалить подозрительное приложение?', 'Не всегда. Нужно проверить банковские операции, активные сессии, доступы, пароли и разрешения приложений.'],
        ['Почему установка приложения после звонка опасна?', 'Под видом помощи мошенники могут просить установить приложение для удалённого доступа, демонстрации экрана или управления устройством.']
      ]
    },
    '/check-before-action/pages/postavshchik-smenil-rekvizity.html': {
      name: 'Поставщик сменил реквизиты — как проверить перед оплатой',
      questions: [
        ['Что делать, если поставщик прислал новые реквизиты?', 'Не оплачивайте только по письму или сообщению. Подтвердите изменение через старый известный контакт и запросите документальное основание.'],
        ['Почему смена реквизитов перед оплатой опасна?', 'Почта поставщика может быть взломана, а письмо с новыми реквизитами — подменено. Деньги могут уйти не тому получателю.'],
        ['Как безопасно подтвердить новые реквизиты?', 'Позвоните по старому номеру, проверьте юрлицо и документы, зафиксируйте кто и когда подтвердил изменение.']
      ]
    }
  };

  const schemaConfig = faqByPath[window.location.pathname];
  if (!schemaConfig) return;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'name': schemaConfig.name,
    'mainEntity': schemaConfig.questions.map(([question, answer]) => ({
      '@type': 'Question',
      'name': question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': answer
      }
    }))
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
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
