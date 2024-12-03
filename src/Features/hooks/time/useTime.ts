export const useTime = (initial: number = Date.now()) => {
    let currentDate = new Date(initial);

    const formatDate = (format: string, date: Date = currentDate) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return format.replace('DD', day).replace('MM', month).replace('YYYY', year.toString()).replace('HH', hours).replace('mm', minutes);
    };

    const setCurrentDate = (time: number, format: string = 'DD.MM.YYYY') => {
        const date = new Date(time);
        return formatDate(format, date);
    };

    return {
        formatDate,
        currentDate,
        currentTimeStamp: initial,
        setCurrentDate,
        getFullDate: () => formatDate('DD.MM.YYYY'), // Динамическое получение даты
    };
};
