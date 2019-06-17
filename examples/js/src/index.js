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
const modalBtns = document.querySelectorAll('[data-dismiss="modal"]');
const imagesDemo = document.getElementById('demo-images');
const copyTooltip = document.getElementById("copy-tooltip");
const copyTooltipBtn = document.getElementById("copy-tooltip-btn");

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

robotIcon.onmouseenter = onMouseEnter;

robotIcon.onmouseleave = onMouseLeave;

imagesDemo.addEventListener('click', (event) => {
  clearActiveImages();

  if (event.target.tagName === 'IMG') {
    event.target.className = 'active';
  }

});

copyTooltipBtn.addEventListener('click', handleCopyToClipboard);
copyTooltipBtn.addEventListener('mouseleave', handleMouseLeaveOnCopyTooltip);

function onMouseEnter() {
  robotIcon.src = 'https://scaleflex.cloudimg.io/width/500/q60.foil1/https://scaleflex.airstore.io/filerobot/assets/robot-with-smile-left.png';
}

function onMouseLeave() {
  robotIcon.src = 'https://scaleflex.cloudimg.io/width/500/q60.foil1/https://scaleflex.airstore.io/filerobot/assets/robot-icon-left.png';
}

function clearActiveImages() {
  const images = imagesDemo.querySelectorAll('img');

  images.forEach(img => {
    img.className = '';
  });
}

//function subscribe(email) {
//  const request = new XMLHttpRequest();
//
//  request.open("POST", `https://us16.api.mailchimp.com/3.0/lists/a0d8ee3b8e/members`);
//
//  //request.addEventListener("load", this.onFileLoad);
//  //request.setRequestHeader('Cookie', `_AVESTA_ENVIRONMENT=prod;`);
// // request.setRequestHeader('Cookie', `_mcid=1.0f827344203a539e89ba7954bfd6b6c0`);
//  request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
//  request.setRequestHeader("Authorization", "Basic " + btoa('emil:bbab7b0738bb2684f0682a30eac8de07-us16'));
//  request.send(JSON.stringify({
//    status: 'subscribed',
//    email_address: email,
//    tags: [
//      "github-image-editor"
//    ],
//    merge_fields: {
//      FNAME: 'Dima',
//      LNAME: 'Stremous'
//    }
//  }));
//}
//
//subscribe('booom@mail.ru')

function handleCopyToClipboard() {
  const copyText = document.getElementById("copy-text");
  copyText.select();
  document.execCommand("copy");

  copyTooltip.innerHTML = "Copied";
}

function handleMouseLeaveOnCopyTooltip() {
  copyTooltip.innerHTML = "Copy to clipboard";
}