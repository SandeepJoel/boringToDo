
export const generateRandomString = () => Math.random().toString(36).slice(2)

export const getFromLocalStorage = (name, key) => {
  return (localStorage.getItem(name) && key) ?
    JSON.parse(localStorage.getItem(name))[key]
    :
    JSON.parse(localStorage.getItem(name));
}