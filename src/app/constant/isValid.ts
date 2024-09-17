export function isValidUsername(username: string) {
    // Проверка длины, наличия буквы и цифры
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{5,}$/;

    return regex.test(username);
}
