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
const configArrow = getElementById("config-arrow");
const configWrapper = getElementById("config-wrapper");
const defaultImg = getElementById("default-img");
const jsTabTitle = getElementById("js-code-tab");
const jsCodeWrapper = getElementById("js-code-wrapper");
const reactTabTitle = getElementById("react-code-tab");
const reactCodeWrapper = getElementById("react-code-wrapper");
const cdnTabTitle = getElementById("cdn-code-tab");
const cdnCodeWrapper = getElementById("cdn-code-wrapper");

const exampleCodeTabs = {
  "js-code-tab": jsCodeWrapper,
  "react-code-tab": reactCodeWrapper,
  "cdn-code-tab": cdnCodeWrapper,
};

const selectedTabs = [TABS.RESIZE];
let isConfigTabsOpen = false;
let useCloudimage = false;

const IMG_EDITOR_TABS = {
  adjust: TABS.ADJUST,
  finetune: TABS.FINETUNE,
  filter: TABS.FILTERS,
  watermark: TABS.WATERMARK,
  annotate: TABS.ANNOTATE,
  resize: TABS.RESIZE,
};

const pluginConfig = {
  img: "https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg",
  Text: { text: "Filerobot..." },
  tabsIds: selectedTabs,
  defaultTabId: TABS.RESIZE,
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

function uploadImg(event) {
  const nextImage = new Image();
  const imagesWrapper = document.querySelector(".uploaded-imgs-wrapper");

  imagesWrapper.appendChild(nextImage);

  nextImage.src = URL.createObjectURL(event.target.files[0]);
  nextImage.className = "uploaded-img";

  nextImage.onclick = toggleActiveImage;

  defaultImg.onclick = toggleActiveImage;

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

function toggleConfigMenu() {
  if (isConfigTabsOpen) {
    configArrow.style.transform = " rotate(0deg)";

    configWrapper.style.opacity = "1";
    configWrapper.style.height = "unset";
    configWrapper.style.display = "block";
  } else {
    configWrapper.style.opacity = "0";
    configWrapper.style.height = "0";
    configWrapper.style.display = "none";

    configArrow.style.transform = " rotate(180deg)";
  }

  isConfigTabsOpen = !isConfigTabsOpen;
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
  const selectedCode = exampleCodeTabs[selectedCodeTabId];

  Object.values(exampleCodeTabs).forEach((codeTab) => {
    codeTab.style.display = "none";
  });

  selectedCode.style.display = "unset";
}

crop.addEventListener("change", onChangeTabsHandler);
finetune.addEventListener("change", onChangeTabsHandler);
filter.addEventListener("change", onChangeTabsHandler);
watermark.addEventListener("change", onChangeTabsHandler);
annotate.addEventListener("change", onChangeTabsHandler);
resize.addEventListener("change", onChangeTabsHandler);
addImg.addEventListener("change", uploadImg);
configArrow.addEventListener("click", toggleConfigMenu);
modeOptions.addEventListener("change", changeModeHandler);
jsTabTitle.addEventListener("click", toggleActiveCodeTab);
reactTabTitle.addEventListener("click", toggleActiveCodeTab);
cdnTabTitle.addEventListener("click", toggleActiveCodeTab);
