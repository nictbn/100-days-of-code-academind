let anchorElement = document.getElementById("external-link");
anchorElement.href = "https://google.com";

anchorElement = document.querySelector("#external-link");
anchorElement.href = "https://wikipedia.org";

anchorElement = document.querySelector("p a");
anchorElement.href = "https://wikipedia.org";

let newAnchorElement = document.createElement('a');
newAnchorElement.href='https://google.com';
newAnchorElement.textContent='This leads to google';

let firstParagraph = document.querySelector('p');
firstParagraph.append(newAnchorElement);


let firstH1Element = document.querySelector('h1');
firstH1Element.remove();
// firstH1Element.parentElement.removeChild(firstH1Element); For older browsers