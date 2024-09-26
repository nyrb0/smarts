import Cookies from 'js-cookie';

export const cookieMy = (c: string): string | null => Cookies.get(c) || null;
