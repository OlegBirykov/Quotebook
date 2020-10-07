/* eslint no-alert: 0 */
const header = document.querySelector('.header');
const exitButton = document.querySelector('.exit-button');
const quotesContainer = document.querySelector('.quotes-container');
const loginForm = document.querySelector('.login-form');
const addForm = document.querySelector('.add-form');

function load() {
  const params = `access=${localStorage.getItem('accessKey')}`;
  const xhr = new XMLHttpRequest();

  xhr.open('POST', 'http://petro-shop.ru/programs/quotebook/quotebook.php');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.addEventListener('loadend', () => {
    switch (xhr.status) {
      case 200:
        if (xhr.response.slice(0, 6) === '{view}') {
          loginForm.classList.remove('active');
          header.classList.add('active');
          quotesContainer.innerHTML = xhr.response.slice(6);
          break;
        }

        if (xhr.response.slice(0, 7) === '{admin}') {
          loginForm.classList.remove('active');
          header.classList.add('active');
          addForm.classList.add('active');
          quotesContainer.innerHTML = xhr.response.slice(7);
          break;
        }

        loginForm.classList.add('active');
        header.classList.remove('active');
        addForm.classList.remove('active');
        quotesContainer.innerHTML = '';
        break;

      case 0:
        alert('Нет связи с сервером');
        break;

      default:
        alert('Ошибка связи с сервером');
    }
  });

  xhr.send(params);
}

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

  const params = Array.from(loginForm.elements)
    .filter(({ name }) => name)
    .map(({ name, value }) => `${name}=${encodeURIComponent(value)}`)
    .join('&');
  const xhr = new XMLHttpRequest();

  xhr.open('POST', 'http://petro-shop.ru/programs/quotebook/quotebook.php');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.addEventListener('loadend', () => {
    switch (xhr.status) {
      case 200:
        if (!xhr.response) {
          alert('Неверный логин или пароль');
          break;
        }
        localStorage.setItem('accessKey', xhr.response);
        window.location.reload();
        break;
      case 0:
        alert('Нет связи с сервером');
        break;
      default:
        alert('Ошибка связи с сервером');
    }
  });

  xhr.send(params);

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

  let params = encodeURIComponent(`<div class="quote">
  <p class="quote-text">
    ${addForm.elements.quote.value}
  </p>
  <h3 class="quote-tags">Категория: ${addForm.elements.tag.value}</h3>
</div>
`);
  params = `access=${localStorage.getItem('accessKey')}&html=${params}&command=add`;
  const xhr = new XMLHttpRequest();

  xhr.open('POST', 'http://petro-shop.ru/programs/quotebook/quotebook.php');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.addEventListener('loadend', () => {
    switch (xhr.status) {
      case 200:
        quotesContainer.innerHTML = xhr.response.slice(7);
        break;
      case 0:
        alert('Нет связи с сервером');
        break;
      default:
        alert('Ошибка связи с сервером');
    }
  });

  xhr.send(params);

  addForm.elements.quote.value = '';
  addForm.elements.tag.value = '';
}

function clearQuote(event) {
  event.preventDefault();

  addForm.elements.quote.value = '';
  addForm.elements.tag.value = '';
}

exitButton.addEventListener('click', () => {
  localStorage.removeItem('accessKey');
  window.location.reload();
});

loginForm.addEventListener('submit', authorization);
loginForm.addEventListener('reset', clearLogin);

addForm.addEventListener('submit', addQuote);
addForm.addEventListener('reset', clearQuote);

load();
