function buildFamilyMemo(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const codeWord = (formData.get('code_word') || '').trim() || 'наше семейное слово';
  const trustedContact = (formData.get('trusted_contact') || '').trim() || 'доверенному человеку';
  const backupAction = (formData.get('backup_action') || '').trim() || 'перезвонить по заранее сохранённому номеру';

  const memo = `Семейное правило безопасности\n\n1. Если кто-то звонит или пишет и срочно просит деньги, сначала нужно спросить кодовое слово: «${codeWord}».\n\n2. Если человек не может назвать кодовое слово, нельзя переводить деньги, сообщать коды из СМС или выполнять инструкции звонящего.\n\n3. Нужно прекратить разговор и связаться с ${trustedContact}.\n\n4. Дополнительная проверка: ${backupAction}.\n\n5. Никому нельзя сообщать коды из СМС, пароли, данные карты и доступ к банковскому приложению.\n\n6. Если звонящий торопит, пугает или запрещает перезванивать — это красный флаг. Нужно остановиться и проверить информацию самостоятельно.`;

  const output = document.getElementById('family-memo');
  const result = document.getElementById('family-result');
  output.value = memo;
  result.classList.add('is-visible');
  trackEvent('family_code_generated');
  result.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('family-code-form');
  if (form) form.addEventListener('submit', buildFamilyMemo);
});
