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