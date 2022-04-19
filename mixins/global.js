export default {
  methods: {
    getCurrencySymbol(currencyCode) {
      if (!currencyCode) return '';

      const currencies = {
        Peso: '&#x20B1;',
        Ruble: '&#x20BD;',
        Yuan: '&#x5143;',
        'Yuan Renminbi': '&#x5143;',
        Zloty: 'zł',
        Krone: 'Kr.',
        Euro: '&#x20AC;',
        Yen: '&#xa5;',
        Hryvnia: '&#x20B4;',
        Bolivar: 'Bs.',
        Baht: '&#x0E3F;',
        Sol: 'S/',
        Won: '₩',
        Dinar: 'KD, د',
        Ariary: 'Ar',
        Marka: 'Ar',
        Koruna: 'Kč',
        Naira: '₦',
        Afghani: '؋',
        Rupiah: 'Rp',
        Krona: 'kr',
        Sweden: 'kr',
        Dollar: '$',
        Boliviano: 'Bs.',
        Denar: 'Ден',
      };

      return currencies[currencyCode.trim()];
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
};
