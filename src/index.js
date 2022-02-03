import './styles.css';
import fetchCountries from './js/fetchCountries';
import countriesTpl from './js/templates/countries';
import countriesListTpl from './js/templates/countries-list';
import refs from './js/refs';
import debounce from 'lodash.debounce';
import toastr from 'toastr';
import options from './js/toastr.options';

toastr.options = options;

let callbackDebounce = debounce(inputCountry, 2000);

refs.input.addEventListener('input', callbackDebounce);

function updateCountriesListMarkup(countries) {
  const markup = countriesListTpl(countries);
  refs.countriesList.insertAdjacentHTML('beforeend', markup);
}

function updateCountriesMarkup(countries) {
  const markup = countriesTpl(countries);
  refs.countriesList.insertAdjacentHTML('beforeend', markup);
}

export default { updateCountriesMarkup, updateCountriesListMarkup };

function inputCountry() {
  fetchCountries(refs.input.value)
    .then(data => markupCountry(data))
    .catch(error => toastr.error(error.messaage));
}

function markupCountry(data) {
  clearC();
  if (data.length > 10) {
    toastr.error('Знайдено забагато збігів! Будь ласка, введіть більш конкретний запит!');
    // console.log('Знайдено забагато збігів! Будь ласка, введіть більш конкретний запит!');
    return;
  }
  if (data.length > 1 && data.length <= 10) {
    updateCountriesListMarkup(data);
    toastr.clear();
    // console.log('Виводимо список країн 2-10');
    return;
  }
  if (data.length === 1) {
    updateCountriesMarkup(data);
    toastr.clear();
    // console.log('Виводимо відомості про країну');
    return;
  }
}

function clearC() {
  refs.countriesList.innerHTML = '';
}
