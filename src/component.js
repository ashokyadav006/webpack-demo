export default (text = "Hello India") => {
    const element = document.createElement("div");

    element.innerHTML = text;
    element.className = "pure-button";

    return element;
};