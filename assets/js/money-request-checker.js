const moneyQuestions = [
  { id: 'urgent', text: 'Просьба срочная: «нужно прямо сейчас», «нет времени объяснять», «счёт горит»?', weight: 2 },
  { id: 'secret', text: 'Просят никому не рассказывать или не звонить другим людям?', weight: 3 },
  { id: 'new_details', text: 'Реквизиты, номер карты, кошелёк или способ оплаты изменились внезапно?', weight: 3 },
  { id: 'no_callback', text: 'Нельзя подтвердить просьбу по старому известному номеру или лично?', weight: 3 },
  { id: 'unusual_method', text: 'Просят оплатить необычным способом: крипта, подарочные карты, перевод на чужую карту, предоплата без документов?', weight: 3 },
  { id: 'pressure', text: 'Есть давление, страх, угрозы, жалость или сильная эмоциональная манипуляция?', weight: 2 },
  { id: 'large_amount', text: 'Сумма для вас заметная или потеря будет болезненной?', weight: 2 }
];

function renderMoneyQuestions() {
  const form = document.getElementById('money-check-form');
  if (!form) return;

  form.innerHTML = moneyQuestions.map((question, index) => `
    <div class="question">
      <p>${index + 1}. ${question.text}</p>
      <label class="option"><input type="radio" name="${question.id}" value="yes" required> Да</label>
      <label class="option"><input type="radio" name="${question.id}" value="no"> Нет</label>
      <label class="option"><input type="radio" name="${question.id}" value="unknown"> Не уверен(а)</label>
    </div>
  `).join('') + '<button class="button button-primary" type="submit" data-track="money_checker_submit">Показать риск</button>';

  form.addEventListener('submit', handleMoneyCheck);
}

function renderMoneyNextSteps(score, formData) {
  const hasNewDetails = formData.get('new_details') === 'yes';
  const hasNoCallback = formData.get('no_callback') === 'yes';
  const hasUnusualMethod = formData.get('unusual_method') === 'yes';

  let links = [];

  if (hasNewDetails) {
    links.push(['../pages/postavshchik-smenil-rekvizity.html', 'Поставщик сменил реквизиты', 'money_result_supplier_details']);
  }
  if (hasNoCallback) {
    links.push(['../pages/rodstvennik-prosit-dengi.html', 'Родственник или знакомый срочно просит деньги', 'money_result_relative']);
  }
  if (hasUnusualMethod) {
    links.push(['../pages/prodavec-prosit-predoplatu.html', 'Продавец просит предоплату', 'money_result_prepayment']);
  }

  if (score >= 9) {
    links.push(['../pages/perevel-dengi-moshennikam.html', 'Если деньги уже переведены', 'money_result_already_paid']);
    links.push(['../pages/direktor-prosit-srochno-oplatit.html', 'Директор просит срочно оплатить', 'money_result_director_payment']);
  } else {
    links.push(['../pages/pokupatel-prosit-pereyti-v-telegram.html', 'Покупатель просит перейти в мессенджер', 'money_result_messenger']);
  }

  const uniqueLinks = links.filter((link, index, array) => array.findIndex(item => item[0] === link[0]) === index).slice(0, 4);

  return `
    <div class="safe-box">
      <h3>Что открыть дальше</h3>
      <p>Выберите ближайшую ситуацию и проверьте её по подробной инструкции.</p>
      <ul>${uniqueLinks.map(([href, label, track]) => `<li><a href="${href}" data-track="${track}">${label}</a></li>`).join('')}</ul>
      <div class="actions">
        <button class="button button-secondary" type="button" data-copy-current-url data-track="money_result_copy_url">Скопировать ссылку на проверку</button>
        <a class="button button-secondary" href="../pages/karta-sayta.html" data-track="money_result_sitemap">Все инструкции</a>
      </div>
    </div>
  `;
}

function handleMoneyCheck(event) {
  event.preventDefault();

  let score = 0;
  let redFlags = [];
  const formData = new FormData(event.target);

  for (const question of moneyQuestions) {
    const value = formData.get(question.id);
    if (value === 'yes') {
      score += question.weight;
      redFlags.push(question.text);
    }
    if (value === 'unknown') {
      score += Math.ceil(question.weight / 2);
    }
  }

  const result = document.getElementById('money-result');
  const title = document.getElementById('money-result-title');
  const body = document.getElementById('money-result-body');

  result.className = 'result is-visible';

  if (score >= 9) {
    result.classList.add('risk-high');
    title.textContent = 'Высокий риск. Не переводите деньги до независимой проверки.';
    body.innerHTML = `
      <p>В ситуации есть признаки давления или подмены. Остановитесь и проверьте просьбу другим способом.</p>
      <h3>Что сделать</h3>
      <ul>
        <li>Не переводите деньги прямо сейчас.</li>
        <li>Свяжитесь с человеком или организацией по старому известному контакту.</li>
        <li>Если речь о бизнес-платеже — запросите подтверждение реквизитов официальным письмом и звонком.</li>
        <li>Если уже перевели деньги — откройте инструкцию о действиях после перевода.</li>
      </ul>
    `;
  } else if (score >= 5) {
    result.classList.add('risk-medium');
    title.textContent = 'Есть тревожные признаки. Сначала подтвердите просьбу.';
    body.innerHTML = `
      <p>Не принимайте решение под давлением. Даже знакомый человек может писать не сам, если аккаунт взломан.</p>
      <h3>Проверка перед переводом</h3>
      <ul>
        <li>Позвоните по сохранённому номеру, а не по номеру из сообщения.</li>
        <li>Задайте вопрос, ответ на который знает только реальный человек.</li>
        <li>Для бизнеса — проверьте реквизиты по старому каналу связи.</li>
      </ul>
    `;
  } else {
    result.classList.add('risk-low');
    title.textContent = 'Сильных признаков риска мало, но перевод всё равно стоит проверить.';
    body.innerHTML = `
      <p>Даже при низком риске не переводите деньги, если ситуация кажется необычной.</p>
      <ul>
        <li>Проверьте получателя.</li>
        <li>Не используйте подозрительные ссылки.</li>
        <li>Сохраняйте переписку и чеки.</li>
      </ul>
    `;
  }

  if (redFlags.length) {
    body.innerHTML += `<h3>Что насторожило</h3><ul>${redFlags.map(flag => `<li>${flag}</li>`).join('')}</ul>`;
  }

  body.innerHTML += renderMoneyNextSteps(score, formData);
  trackEvent('money_checker_finished', { score });
  result.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.addEventListener('DOMContentLoaded', renderMoneyQuestions);
