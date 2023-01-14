export const addUserToLocalStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
};
export const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
};
export const getUserFromLocalStorage = () => {
    const localUser = localStorage.getItem("user");
    return localUser ? JSON.parse(localUser) : null;
};