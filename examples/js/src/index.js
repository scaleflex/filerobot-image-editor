import './style.css';
import './assets/fonts/helvetica-neue.css';
import './filerobot-init-example';

// Highlighting of code
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github.css';
hljs.registerLanguage('javascript', javascript);
hljs.initHighlightingOnLoad();

const jsBtn = document.getElementById('js-btn');
const reactBtn = document.getElementById('react-btn');
const jsBox = document.getElementById('js-version-box');
const reactBox = document.getElementById('react-version-box');
const resultModal = document.getElementById('result-modal');
const spinner = document.getElementById('spinner');
const wrapper = document.getElementById('main');
const robotIcon = document.getElementById('robot-icon');
const buttonEdit = document.getElementById('edit-btn');
const image = document.getElementById('image');
const modalBtns = document.querySelectorAll('[data-dismiss="modal"]');

jsBtn.onclick = function() {
  if (jsBtn.className.indexOf('btn-primary') === -1) {
    jsBtn.classList.remove('btn-light');
    jsBtn.classList.add('btn-primary');
    reactBtn.classList.remove('btn-primary');
    reactBtn.classList.add('btn-light');

    reactBox.style.display = 'none';
    jsBox.style.display = 'block';
  }
}

reactBtn.onclick = function() {
  if (reactBtn.className.indexOf('btn-primary') === -1) {
    reactBtn.classList.remove('btn-light');
    reactBtn.classList.add('btn-primary');
    jsBtn.classList.remove('btn-primary');
    jsBtn.classList.add('btn-light');

    jsBox.style.display = 'none'
    reactBox.style.display = 'block';
  }
}

modalBtns.forEach(btn => {
  btn.onclick = () => {
    resultModal.style.display = 'none';
  }
});

setTimeout(() => {
  wrapper.classList.add('active');
  spinner.style.display = 'none';
}, 400);

image.onmouseenter = onMouseEnter;
buttonEdit.onmouseenter = onMouseEnter;

image.onmouseleave = onMouseLeave;
buttonEdit.onmouseleave = onMouseLeave;

function onMouseEnter() {
  robotIcon.src = 'https://demo.cloudimg.io/width/500/q35.foil1/https://scaleflex.airstore.io/filerobot/assets/robot-with-smile-left.png';
}

function onMouseLeave() {
  robotIcon.src = 'https://demo.cloudimg.io/width/500/q35.foil1/https://scaleflex.airstore.io/filerobot/assets/robot-icon-left.png';
}


