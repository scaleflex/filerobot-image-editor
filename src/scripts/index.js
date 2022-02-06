import FilerobotImageEditor, { TABS, TOOLS } from "filerobot-image-editor";

const crop = document.getElementById("crop");
const finetune = document.getElementById("finetune");
const filter = document.getElementById("filter");
const watermark = document.getElementById("watermark");
const annotate = document.getElementById("annotate");
const resize = document.getElementById("resize");
const addImg = document.getElementById("add-image");
const modeOptions = document.getElementById("mode-options");
const configArrow = document.getElementById("config-arrow");
const configWrapper = document.getElementById("config-wrapper");
const defaultUploadedImg = document.getElementById("default-uploaded-img");

const tabs = [TABS.RESIZE];
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
  annotationsCommon: {
    fill: "#ff0000",
  },
  Text: { text: "Filerobot..." },
  tabsIds: [...tabs],
  defaultToolId: TOOLS.TEXT,
  cloudimage: {
    token: "demo",
    version: "v7",
  },
};

function filrebotoImageEditor() {
  const filerobotImageEditor = new FilerobotImageEditor(
    document.querySelector("#editor_container"),
    pluginConfig,
  );

  filerobotImageEditor.render({
    onClose: (closingReason) => {
      console.log("Closing reason", closingReason);
      filerobotImageEditor.terminate();
    },
    onSave: (imageInfo) => {
      onSave(
        imageInfo[useCloudimage ? "cloudimageUrl" : "imageBase64"],
        imageInfo.fullName,
      );
    },
    useCloudimage,
  });
}

filrebotoImageEditor();

function onChangeTabsHandler(event) {
  const value = event.target.value;
  const checked = event.target.checked;
  const nextTab = IMG_EDITOR_TABS[value];

  if (checked) {
    if (!tabs.includes(nextTab)) {
      tabs.push(nextTab);
    }
  } else {
    const removedTabIndex = tabs.indexOf(nextTab);

    if (tabs.includes(nextTab) && tabs.length === 1) {
      event.target.checked = true;

      return;
    }

    tabs.splice(removedTabIndex, 1);
  }

  pluginConfig.tabsIds = [...tabs];

  filrebotoImageEditor();
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

  toggleActiveImage(nextImage);

  nextImage.onclick = toggleActiveImage;

  defaultUploadedImg.onclick = toggleActiveImage;

  pluginConfig.img = nextImage.src;

  nextImage.onload = () => {
    filrebotoImageEditor();
  };
}

function toggleActiveImage(event) {
  const nextImage = event?.target || event;

  const prevActiveImage = document.querySelector(
    "[data-image-editor-active-image]",
  );

  if (prevActiveImage) {
    prevActiveImage.removeAttribute("data-image-editor-active-image");
  }

  nextImage.setAttribute("data-image-editor-active-image", "");

  pluginConfig.img = nextImage.src;
  filrebotoImageEditor();
}

function closeConfigTabHandler() {
  if (isConfigTabsOpen) {
    configArrow.style.transform = " rotate(0deg)";

    configWrapper.style.opacity = "1";
    configWrapper.style.height = "unset";

    isConfigTabsOpen = false;
  } else {
    configWrapper.style.opacity = "0";
    configWrapper.style.height = "0";

    configArrow.style.transform = " rotate(180deg)";

    isConfigTabsOpen = true;
  }
}

function changeModeHandler() {
  if (modeOptions.value === "CloudImage") {
    annotate.disabled = true;
    annotate.checked = false;
    filter.disabled = true;
    filter.checked = false;
    useCloudimage = true;
  } else {
    annotate.disabled = false;
    filter.disabled = false;
    useCloudimage = false;
  }

  filrebotoImageEditor();
}

crop.addEventListener("change", onChangeTabsHandler);
finetune.addEventListener("change", onChangeTabsHandler);
filter.addEventListener("change", onChangeTabsHandler);
watermark.addEventListener("change", onChangeTabsHandler);
annotate.addEventListener("change", onChangeTabsHandler);
resize.addEventListener("change", onChangeTabsHandler);
addImg.addEventListener("change", uploadImg);
configArrow.addEventListener("click", closeConfigTabHandler);
modeOptions.addEventListener("change", changeModeHandler);
