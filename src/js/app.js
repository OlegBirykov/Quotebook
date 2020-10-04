const loginForm = document.querySelector('.login-form');
const addForm = document.querySelector('.add-form');

function authorization(event) {
  event.preventDefault();

  if (loginForm.elements.login.value.trim() === '') {
    alert('Введите логин');
    return;
  }

  if (loginForm.elements.password.value.trim() === '') {
    alert('Введите пароль');
    return;
  }

  loginForm.elements.login.value = '';
  loginForm.elements.password.value = '';
}

function clearLogin(event) {
  event.preventDefault();

  loginForm.elements.login.value = '';
  loginForm.elements.password.value = '';
}

function addQuote(event) {
  event.preventDefault();

  if (addForm.elements.quote.value.trim() === '') {
    alert('Введите текст цитаты');
    return;
  }

  if (addForm.elements.tag.value.trim() === '') {
    alert('Введите категорию цитаты');
    return;
  }

  addForm.elements.quote.value = '';
  addForm.elements.tag.value = '';
}

function clearQuote(event) {
  event.preventDefault();

  addForm.elements.text.value = '';
  addForm.elements.tag.value = '';
}

loginForm.addEventListener('submit', authorization);
loginForm.addEventListener('reset', clearLogin);

addForm.addEventListener('submit', addQuote);
addForm.addEventListener('reset', clearQuote);
