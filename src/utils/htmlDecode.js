export const htmlDecode = input =>{ 
    var element = document.createElement("div");
    element.innerHTML = input;
    return element.childNodes.length === 0 ? "" : element.childNodes[0].nodeValue;
}