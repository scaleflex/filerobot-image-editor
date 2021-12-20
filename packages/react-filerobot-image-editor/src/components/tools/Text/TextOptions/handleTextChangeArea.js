let textarea;
let textNode;
let transformer;
let editFinishCallback;
let disableTextEditCallback;

const handleOutsideClick = (e) => {
  if (e.target !== textarea) {
    const textValue = textarea.value;
    // eslint-disable-next-line no-use-before-define
    deactivateTextChange();
    editFinishCallback(textValue);
  }
};

const deactivateTextChange = () => {
  if (textarea) {
    textarea.remove(textarea);
  }
  if (window) {
    window.removeEventListener('click', handleOutsideClick);
  }
  if (textNode) {
    textNode.show();
  }
  if (transformer) {
    transformer.show();
    transformer.forceUpdate();
  }
  if (typeof disableTextEditCallback === 'function') {
    disableTextEditCallback();
  }
  textNode = null;
  textarea = null;
  transformer = null;
};

const activateTextChange = (
  textNodeId,
  canvasStage,
  currentTransformer,
  finishingCallback,
  dismissingTextEditing,
) => {
  editFinishCallback = finishingCallback;
  disableTextEditCallback = dismissingTextEditing;
  transformer = currentTransformer;
  textNode = canvasStage.findOne(`#${textNodeId}`);
  // hide text node and transformer:
  textNode.hide();
  transformer.hide();

  // at first lets find position of text node relative to the stage:
  const textPosition = textNode.absolutePosition();

  // create textarea and style it
  textarea = document.createElement('textarea');
  canvasStage.container().parentNode.appendChild(textarea);

  // apply many styles to match text on canvas as close as possible
  // remember that text rendering on canvas and on the textarea can be different
  // and sometimes it is hard to make it 100% the same. But we will try...
  textarea.value = textNode.text();
  textarea.style.position = 'absolute';
  textarea.style.top = `${textPosition.y}px`;
  textarea.style.left = `${textPosition.x}px`;
  textarea.style.width = `${textNode.width() - textNode.padding() * 2}px`;
  textarea.style.height = `${textNode.height() - textNode.padding() * 2 + 5}px`;
  textarea.style.maxWidth = `${textNode.width() - textNode.padding() * 2}px`;
  textarea.style.maxHeight = `${
    textNode.height() - textNode.padding() * 2 + 5
  }px`;
  textarea.style.fontSize = `${textNode.fontSize()}px`;
  textarea.style.border = '1px solid rgba(0, 0, 0, 0.5)';
  textarea.style.padding = '0px';
  textarea.style.margin = '0px';
  textarea.style.overflow = 'hidden';
  textarea.style.background = 'none';
  textarea.style.outline = 'none';
  textarea.style.resize = 'none';
  textarea.style.lineHeight = textNode.lineHeight();
  textarea.style.fontFamily = textNode.fontFamily();
  textarea.style.transformOrigin = 'left top';
  textarea.style.textAlign = textNode.align();
  textarea.style.fontStyle = textNode.fontStyle();
  textarea.style.letterSpacing = textNode.letterSpacing();
  textarea.style.lineHeight = textNode.lineHeight();
  textarea.style.color = textNode.fill();
  const rotation = textNode.rotation();
  let transform = '';
  if (rotation) {
    transform += `rotateZ(${rotation}deg)`;
  }

  let firefoxMovePx = 0;
  // also we need to slightly move textarea on firefox
  // because it jumps a bit
  const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
  if (isFirefox) {
    firefoxMovePx += 2 + Math.round(textNode.fontSize() / 20);
  }
  transform += `translateY(-${firefoxMovePx}px)`;

  textarea.style.transform = transform;

  // reset height
  textarea.style.height = 'auto';
  // after browsers resized it we can set actual value
  textarea.style.height = `${textarea.scrollHeight + 3}px`;

  textarea.focus();

  function setTextareaWidth(newTextWidth) {
    let newWidth = newTextWidth;
    if (!newWidth) {
      // set width for placeholder
      newWidth = textNode.placeholder.length * textNode.fontSize();
    }
    // some extra fixes on different browsers
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari || isFirefox) {
      newWidth = Math.ceil(newWidth);
    }

    const isEdge = document.documentMode || /Edge/.test(navigator.userAgent);
    if (isEdge) {
      newWidth += 1;
    }
    textarea.style.width = `${newWidth}px`;
  }

  textarea.addEventListener('keydown', (event) => {
    // hide on enter
    // but don't hide on shift + enter
    if (event.key === 'Enter' && !event.shiftKey) {
      const textContent = textarea.value;
      deactivateTextChange();
      editFinishCallback(textContent);
    }
    // on esc do not set value back to node
    if (event.key === 'Escape') {
      deactivateTextChange();
    }
  });

  textarea.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === 'Escape') {
      return;
    }
    const scale = textNode.getAbsoluteScale().x;
    setTextareaWidth(textNode.width() * scale);
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight + textNode.fontSize()}px`;
  });

  if (window) {
    setTimeout(() => {
      window.addEventListener('click', handleOutsideClick);
    });
  }
};

export { activateTextChange, deactivateTextChange };
