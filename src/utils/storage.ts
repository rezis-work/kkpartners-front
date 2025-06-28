const EMAIL_KEY = 'email';

export const setRememberEmail = (email: string) => {
    localStorage.setItem(EMAIL_KEY, email);
}

export const getRememberEmail = () => {
    return localStorage.getItem(EMAIL_KEY);
}

export const clearRememberEmail = () => {
    localStorage.removeItem(EMAIL_KEY);
}
