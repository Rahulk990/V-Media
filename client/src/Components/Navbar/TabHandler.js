const setNewPath = (newValue) => {
    const newURL = window.location.protocol + '//' +
        window.location.host + '/' + newValue;
    window.history.pushState({ path: newURL }, "", newURL);
}

export const centerOptionHandler = (id) => {
    setNewPath(id);
    document.getElementById('home').classList.remove("navbar__option--active");
    document.getElementById('teams').classList.remove("navbar__option--active");
    document.getElementById('messenger').classList.remove("navbar__option--active");
    document.getElementById(id).classList.toggle("navbar__option--active");
}
