const contactEmail = '';
const form = document.querySelector('#contact-form');
const serviceNames = {training:'法人向けAI研修',consulting:'AI導入・活用支援',japan:'海外AI企業の日本市場進出支援'};
const selectedService = serviceNames[new URLSearchParams(location.search).get('service')];
if (selectedService && form) form.elements.service.value = selectedService;
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {form.elements.service.value = link.dataset.service;}));
if (contactEmail) {
  const button = form.querySelector('button');
  button.disabled = false;
  button.innerHTML = 'メールで相談する <span>↗</span>';
  document.querySelector('#form-note').textContent = '入力内容を引き継いでメールアプリが開きます。内容を確認して送信してください。';
}
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!contactEmail || !form.reportValidity()) return;
  const data = new FormData(form);
  const body = `お名前：${data.get('name')}\n会社名：${data.get('company')}\nメールアドレス：${data.get('email')}\nご相談サービス：${data.get('service')}\n\n${data.get('message')}`;
  location.href = `mailto:${contactEmail}?subject=${encodeURIComponent('【DONG お問い合わせ】' + data.get('service'))}&body=${encodeURIComponent(body)}`;
  document.querySelector('#form-status').textContent = 'メールアプリで内容を確認し、送信を完了してください。この画面からは直接送信されません。';
});
