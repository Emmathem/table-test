import Vue from 'vue';

Vue.filter('amountFormat', (value) => {
  if (!value) {
    return '0.00';
  }
  const initial = parseFloat(value).toFixed(2);
  return initial.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
})
