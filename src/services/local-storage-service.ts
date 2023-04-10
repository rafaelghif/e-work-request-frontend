export const setToken = (token: string): void => {
    localStorage.setItem("token", token);
}

export const getToken = (): string | null => {
    const token = localStorage.getItem("token");
    return token;
}

export const clearLocalStorage = (): void => {
    localStorage.clear();
}