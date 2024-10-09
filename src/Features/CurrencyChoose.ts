export const currencyChoose = (theCurrency: string) => {
    if (theCurrency === 'som') {
        return 'сом';
    } else if (theCurrency === 'rub') {
        return 'рубль';
    } else if (theCurrency === 'usd') {
        return '$';
    }
};
