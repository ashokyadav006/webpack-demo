export default (text = "Hello India") => {
    const element = document.createElement("div");

    element.innerHTML = text;

    return element;
};