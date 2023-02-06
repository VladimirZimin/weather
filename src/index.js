import './sass/main.scss';
import fetсhWeather from './js/api-weatherService';
import getRefs from './js/get-refs';
import Notiflix from 'notiflix';
import templatesHeaedr from './templates/templatesHeaedr.hbs';
import templatesBody from './templates/templatesBody.hbs';

const refs = getRefs();
let query = '';

refs.searchForm.addEventListener('submit', onSearch);
refs.previousButton.addEventListener('click', onBack);

onBack();

function onSearch(evt) {
  evt.preventDefault();

  query = evt.currentTarget.elements.query.value.trim();

  fetсhWeather(query)
    .then(data => {
      const { location, current } = data;

      renderMarkup(current, location);
      refs.searchForm.classList.add('js-form-hidden');
      refs.previousButton.classList.remove('js-previous-hidden');

      if (location === undefined) {
        Notiflix.Notify.failure(`Упсс... Введите название страны`);
        onBack();
        return;
      }

      if (!current.is_day) {
        refs.mainBox.classList.add('js-page-night');
      }

      getMessage();
    })
    .catch(error => {
      console.log('Ошибка', error);
    })
    .finally(() => refs.searchForm.reset());
}

function renderMarkup(current, location) {
  refs.mainBox.insertAdjacentHTML('beforeend', templatesHeaedr(location));
  refs.mainBox.insertAdjacentHTML('beforeend', templatesBody(current));
}

function clearMarkup() {
  refs.mainBox.innerHTML = '';
}

function getMessage() {
  Notiflix.Notify.success(`Прогноз погоды для города: ${query}`);
}

function onBack() {
  refs.previousButton.classList.add('js-previous-hidden');
  refs.searchForm.classList.remove('js-form-hidden');
  refs.mainBox.classList.remove('js-page-night');
  clearMarkup();

  Notiflix.Notify.info('Привет, введи страну или город');
}
