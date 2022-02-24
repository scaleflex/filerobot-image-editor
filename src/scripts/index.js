import FilerobotImageEditor, { TABS, TOOLS } from "filerobot-image-editor";

function getElementById(id) {
  return document.getElementById(id);
}

const crop = getElementById("crop");
const finetune = getElementById("finetune");
const filter = getElementById("filter");
const watermark = getElementById("watermark");
const annotate = getElementById("annotate");
const resize = getElementById("resize");
const addImg = getElementById("add-image");
const modeOptions = getElementById("mode-options");
const jsTabTitle = getElementById("js-code-tab");
const jsCodeWrapper = getElementById("js-code-wrapper");
const reactTabTitle = getElementById("react-code-tab");
const reactCodeWrapper = getElementById("react-code-wrapper");
const cdnTabTitle = getElementById("cdn-code-tab");
const cdnCodeWrapper = getElementById("cdn-code-wrapper");
const copyButtons = document.querySelectorAll(".copy-button");
const accordions = document.querySelectorAll("[data-accordion]");

let useCloudimage = false;

const EXAMPLE_CODE_TABS = {
  "js-code-tab": jsCodeWrapper,
  "react-code-tab": reactCodeWrapper,
  "cdn-code-tab": cdnCodeWrapper,
};

const DEFAULT_IMAGES_SRCS = [
  "https://scaleflex.cloudimg.io/v7/demo/river.png",
  "https://scaleflex.airstore.io/demo/spencer-davis-unsplash.jpg",
  "https://scaleflex.cloudimg.io/v7/demo/damian-markutt-unsplash.jpg",
];

const selectedTabs = [
  TABS.ADJUST,
  TABS.FINETUNE,
  TABS.FILTERS,
  TABS.WATERMARK,
  TABS.ANNOTATE,
  TABS.RESIZE,
];

const IMG_EDITOR_TABS = {
  adjust: TABS.ADJUST,
  finetune: TABS.FINETUNE,
  filter: TABS.FILTERS,
  watermark: TABS.WATERMARK,
  annotate: TABS.ANNOTATE,
  resize: TABS.RESIZE,
};

const pluginConfig = {
  img: "https://scaleflex.cloudimg.io/v7/demo/river.png",
  Text: { text: "Filerobot..." },
  tabsIds: selectedTabs,
  defaultTabId: [TABS.RESIZE],
  defaultToolId: TOOLS.TEXT,
  cloudimage: {
    token: "demo",
    version: "v7",
  },
};

const filerobotImageEditor = new FilerobotImageEditor(
  document.querySelector("#editor_container"),
  pluginConfig,
);

filerobotImageEditor.render({
  onClose: (closingReason) => {
    console.log("Closing reason", closingReason);
    // filerobotImageEditor.terminate();
  },
  onSave: (imageInfo) => {
    onSave(
      imageInfo[useCloudimage ? "cloudimageUrl" : "imageBase64"],
      imageInfo.fullName,
    );
  },
  useCloudimage,
});

function onChangeTabsHandler(event) {
  const { value, checked } = event.target;
  const nextTab = IMG_EDITOR_TABS[value];

  if (checked) {
    if (!selectedTabs.includes(nextTab)) {
      selectedTabs.push(nextTab);
    }
  } else {
    const removedTabIndex = selectedTabs.indexOf(nextTab);

    if (selectedTabs.includes(nextTab) && selectedTabs.length === 1) {
      event.target.checked = true;

      return;
    }

    selectedTabs.splice(removedTabIndex, 1);
  }

  filerobotImageEditor.render({ tabsIds: [...selectedTabs] });
}

function onSave(url, fileName) {
  let tmpLink = document.createElement("a");
  tmpLink.href = url;

  if (useCloudimage) {
    tmpLink.target = "_blank";
  } else {
    tmpLink.download = fileName;
  }

  tmpLink.style = "position: absolute; z-index: -111; visibility: none;";
  document.body.appendChild(tmpLink);
  tmpLink.click();
  document.body.removeChild(tmpLink);
  tmpLink = null;
}

function appendImageToContainer(image) {
  const imagesWrapper = document.querySelector(".uploaded-imgs-wrapper");

  imagesWrapper.appendChild(image);

  image.className = "uploaded-img";

  image.onclick = toggleActiveImage;
}

function uploadImg(event) {
  const nextImage = new Image();

  nextImage.src = URL.createObjectURL(event.target.files[0]);

  appendImageToContainer(nextImage);

  nextImage.onload = () => {
    toggleActiveImage(nextImage);

    filerobotImageEditor.render({ img: nextImage.src });
  };
}

function toggleActiveImage(eventOrImg) {
  const nextImage = eventOrImg?.target || eventOrImg;

  const prevActiveImage = document.querySelector(
    "[data-image-editor-active-image]",
  );

  if (prevActiveImage) {
    prevActiveImage.removeAttribute("data-image-editor-active-image");
  }

  nextImage.setAttribute("data-image-editor-active-image", "");

  filerobotImageEditor.render({ img: nextImage.src });
}

function changeModeHandler() {
  if (modeOptions.value === "Cloudimage") {
    annotate.disabled = true;
    annotate.checked = false;
    filter.disabled = true;
    filter.checked = false;
    useCloudimage = true;
  } else {
    if (selectedTabs.includes(annotate.name)) {
      annotate.checked = true;
    }

    if (selectedTabs.includes(filter.name)) {
      filter.checked = true;
    }

    annotate.disabled = false;
    filter.disabled = false;
    useCloudimage = false;
  }

  filerobotImageEditor.render({ useCloudimage, tabsIds: [...selectedTabs] });
}

function toggleActiveCodeTab(event) {
  const nextCodeTab = event.target || event;

  changeCodeTabHandler(event);

  const prevCodeTab = document.querySelector("[selected-tab]");

  if (prevCodeTab) {
    prevCodeTab.removeAttribute("selected-tab");
  }

  nextCodeTab.setAttribute("selected-tab", "");
}

function changeCodeTabHandler(event) {
  const selectedCodeTabId = event.target.id;
  const selectedCode = EXAMPLE_CODE_TABS[selectedCodeTabId];

  Object.values(EXAMPLE_CODE_TABS).forEach((codeTab) => {
    codeTab.style.display = "none";
  });

  selectedCode.style.display = "unset";
}

document.onreadystatechange = () => {
  DEFAULT_IMAGES_SRCS.forEach((imageSrc, index) => {
    const image = new Image();
    image.src = imageSrc;

    appendImageToContainer(image);

    if (!index) {
      toggleActiveImage(image);
    }
  });
};

function copyCodeHandler(event) {
  const copyButton = event.currentTarget.getElementsByTagName("p")[0];
  const currentCodeTabId = document.querySelector("[selected-tab]").id;
  const currentCodeToCopy = EXAMPLE_CODE_TABS[currentCodeTabId];

  navigator.clipboard.writeText(currentCodeToCopy.innerText);

  if (copyButton.innerHTML === "Copy") {
    copyButton.innerHTML = "copied";

    setTimeout(() => {
      copyButton.innerHTML = "Copy";
    }, 500);
  }
}

function showAccordionContent(event) {
  const contentId = event.target.getAttribute("data-accordion");
  const content = document.querySelector(
    `[data-accordion-content="${contentId}"]`,
  );

  content.style.display = !content?.offsetWidth ? "block" : "none";
}

crop.addEventListener("change", onChangeTabsHandler);
finetune.addEventListener("change", onChangeTabsHandler);
filter.addEventListener("change", onChangeTabsHandler);
watermark.addEventListener("change", onChangeTabsHandler);
annotate.addEventListener("change", onChangeTabsHandler);
resize.addEventListener("change", onChangeTabsHandler);
addImg.addEventListener("change", uploadImg);
modeOptions.addEventListener("change", changeModeHandler);
jsTabTitle.addEventListener("click", toggleActiveCodeTab);
reactTabTitle.addEventListener("click", toggleActiveCodeTab);
cdnTabTitle.addEventListener("click", toggleActiveCodeTab);
copyButtons.forEach((copyButton) => {
  copyButton.addEventListener("click", copyCodeHandler);
});

accordions.forEach((accordion) => {
  accordion.addEventListener("click", showAccordionContent);
});
