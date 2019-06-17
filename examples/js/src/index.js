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
const subscribeBtn = document.getElementById('subscribe');
const responseMessage = document.getElementById('success-message');

const successText = 'Your request has been sent! Our team will contact you shortly.';
const errorText = 'Error. Something went wrong. :( Pls, try again.';

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
  if (event.target.classList.contains('demo-img')) {
    clearActiveImages();

    event.target.classList.add('active');
  }

});

copyTooltipBtn.addEventListener('click', handleCopyToClipboard);
copyTooltipBtn.addEventListener('mouseleave', handleMouseLeaveOnCopyTooltip);

subscribeBtn.addEventListener('click', (event) => {
  event.stopPropagation();
  event.preventDefault();

  const emailInput = document.getElementById('subscribe-email');

  if (emailInput.value) {
    subscribe(emailInput.value);
  }

  return false;
})

function onMouseEnter() {
  robotIcon.src = 'https://scaleflex.cloudimg.io/width/500/q60.foil1/https://scaleflex.airstore.io/filerobot/assets/robot-with-smile-left.png';
}

function onMouseLeave() {
  robotIcon.src = 'https://scaleflex.cloudimg.io/width/500/q60.foil1/https://scaleflex.airstore.io/filerobot/assets/robot-icon-left.png';
}

function clearActiveImages() {
  const images = imagesDemo.querySelectorAll('.demo-img');

  images.forEach(img => {
    img.classList.remove('active');
  });
}

function subscribe(email) {
  const request = new XMLHttpRequest();

  responseMessage.style.display = 'block';
  responseMessage.innerText = 'Sending...';

  request.open("GET", `https://api.scaleflex.cloud/scaleflex/public/register?email=${email}`);
  request.send();

  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      const emailInput = document.getElementById('subscribe-email');
      const response = JSON.parse(request.responseText);

      if (request.status === 200 && response.status === 'done') {
        console.log('successful');
        responseMessage.innerText = successText;
        emailInput.value = '';
      } else {
        responseMessage.innerText = errorText;
        emailInput.value = '';
      }
    }
  }
}

function handleCopyToClipboard() {
  const copyText = document.getElementById("copy-text");
  copyText.select();
  document.execCommand("copy");

  copyTooltip.innerHTML = "Copied";
}

function handleMouseLeaveOnCopyTooltip() {
  copyTooltip.innerHTML = "Copy to clipboard";
}