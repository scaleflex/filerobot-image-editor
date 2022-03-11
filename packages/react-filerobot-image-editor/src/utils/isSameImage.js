const isSameImage = (img1, img2HtmlElement) =>
  img1 &&
  img2HtmlElement &&
  ((img1 instanceof HTMLImageElement &&
    img1.src === img2HtmlElement.src &&
    img1.width === img2HtmlElement.width &&
    img1.height === img2HtmlElement.height) ||
    (img1?.src || img1) === img2HtmlElement.src);

export default isSameImage;
