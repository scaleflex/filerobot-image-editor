const uriDownload = (url, fileName) => {
  let tmpLink = document.createElement('a');
  tmpLink.href = url;
  tmpLink.download = fileName;
  tmpLink.style = 'position: absolute; z-index: -111; visibility: none;';
  document.body.appendChild(tmpLink);
  tmpLink.click();
  document.body.removeChild(tmpLink);
  tmpLink = null;
};

export default uriDownload;
