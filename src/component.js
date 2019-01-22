import logo from './logo.png';

export default (text = "Hello India") => {
    const element = document.createElement("div");

    element.innerHTML = `<img src="${logo}" height="20px"></img> `+text;
    element.className = "pure-button";

    return element;
};