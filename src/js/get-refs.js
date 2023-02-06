export default function getRefs() {
  return {
    searchForm: document.querySelector('.js-search-form'),
    mainBox: document.querySelector('.page'),
    temperatureValue: document.querySelector('.temperature__value'),
    previousButton: document.querySelector('.previous'),
  };
}
