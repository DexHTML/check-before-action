const callQuestions = [
  { id: 'bank', text: 'Звонящий представился банком, службой безопасности, милицией или оператором?', weight: 2 },
  { id: 'urgency', text: 'Вас торопят и говорят, что действовать нужно прямо сейчас?', weight: 2 },
  { id: 'sms', text: 'Просят назвать код из СМС, push-код, пароль или данные карты?', weight: 4 },
  { id: 'safe_account', text: 'Говорят перевести деньги на «безопасный», «резервный» или «защитный» счёт?', weight: 4 },
  { id: 'no_hangup', text: 'Запрещают класть трубку, перезванивать или советоваться с близкими?', weight: 3 },
  { id: 'app', text: 'Просят установить приложение, включить демонстрацию экрана или перейти по ссылке?', weight: 4 },
  { id: 'threat', text: 'Угрожают блокировкой, уголовной ответственностью, потерей денег или проблемами для родственников?', weight: 3 }
];

function renderCallQuestions() {
  const form = document.getElementById('call-check-form');
  if (!form) return;

  form.innerHTML = callQuestions.map((question, index) => `
    <div class="question">
      <p>${index + 1}. ${question.text}</p>
      <label class="option"><input type="radio" name="${question.id}" value="yes" required> Да</label>
      <label class="option"><input type="radio" name="${question.id}" value="no"> Нет</label>
      <label class="option"><input type="radio" name="${question.id}" value="unknown"> Не уверен(а)</label>
    </div>
  `).join('') + '<button class="button button-primary" type="submit" data-track="call_checker_submit">Показать риск</button>';

  form.addEventListener('submit', handleCallCheck);
}

function handleCallCheck(event) {
  event.preventDefault();

  let score = 0;
  let redFlags = [];

  for (const question of callQuestions) {
    const value = new FormData(event.target).get(question.id);
    if (value === 'yes') {
      score += question.weight;
      redFlags.push(question.text);
    }
    if (value === 'unknown') {
      score += Math.ceil(question.weight / 2);
    }
  }

  const result = document.getElementById('call-result');
  const title = document.getElementById('call-result-title');
  const body = document.getElementById('call-result-body');

  result.className = 'result is-visible';

  if (score >= 10) {
    result.classList.add('risk-high');
    title.textContent = 'Высокий риск. Прекратите разговор.';
    body.innerHTML = `
      <p>В ситуации есть несколько сильных признаков мошеннического давления. Не называйте коды, не переводите деньги, не устанавливайте приложения и не переходите по ссылкам.</p>
      <h3>Что сделать сейчас</h3>
      <ul>
        <li>Положите трубку.</li>
        <li>Позвоните в банк по номеру с карты или официального сайта.</li>
        <li>Предупредите близких, если звонок касался родственников.</li>
        <li>Если вы уже что-то сообщили, перейдите к инструкции «Что делать, если сказал код из СМС».</li>
      </ul>
    `;
  } else if (score >= 5) {
    result.classList.add('risk-medium');
    title.textContent = 'Повышенный риск. Нужна проверка через официальный канал.';
    body.innerHTML = `
      <p>Есть тревожные признаки. Не принимайте решение во время разговора.</p>
      <h3>Безопасный порядок</h3>
      <ul>
        <li>Завершите разговор.</li>
        <li>Проверьте информацию самостоятельно: через приложение банка, официальный сайт или номер с карты.</li>
        <li>Не используйте номер, который продиктовал звонящий.</li>
      </ul>
    `;
  } else {
    result.classList.add('risk-low');
    title.textContent = 'Явных сильных признаков мало, но осторожность всё равно нужна.';
    body.innerHTML = `
      <p>По ответам риск выглядит ниже, но это не гарантия безопасности. Никогда не называйте коды, пароли и данные карты по телефону.</p>
      <h3>Минимальная проверка</h3>
      <ul>
        <li>Не сообщайте секретные данные.</li>
        <li>Перезванивайте только по официальному номеру.</li>
        <li>Сомневаетесь — завершите разговор и проверьте информацию позже.</li>
      </ul>
    `;
  }

  if (redFlags.length) {
    body.innerHTML += `<h3>Красные флаги в ваших ответах</h3><ul>${redFlags.map(flag => `<li>${flag}</li>`).join('')}</ul>`;
  }

  body.innerHTML += '<p><a href="../pages/skazal-kod-iz-sms.html">Если вы уже назвали код из СМС — откройте срочную инструкцию.</a></p>';
  trackEvent('call_checker_finished', { score });
  result.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.addEventListener('DOMContentLoaded', renderCallQuestions);
