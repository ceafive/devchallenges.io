const uploaderBox = document.querySelector("#image-uploader");
const imageInput = document.querySelector("#upload-box");
const uploadButton = document.querySelector("#upload-button");
const uploadingBox = document.querySelector("#uploading-box");
const copyLinkButton = document.querySelector("#copy-link-button");
const urlBox = document.querySelector("#url-box");
const progressBar = document.querySelector("#progress-bar");
const imageSuccess = document.querySelector("#image-success");
const imageSuccessPreview = document.querySelector("#image-success-preview");
const errorText = document.querySelector("#error-text");

const CORS = "https://cors-anywhere.herokuapp.com/";

const BASE_URI = "https://api.cloudinary.com/v1_1/ceafive/upload";
const UPLOAD_PRESET = "pkwfgsoq";

let imageURL = "";

function progressBarWidth(width) {
  progressBar.style.width = `${width}%`;
  // progressBar.innerHTML = `<span class='text-xs'>${width}%</span>`;
}

async function sendToCloudinary(formData) {
  try {
    errorText.classList.add("hidden");
    uploaderBox.classList.add("animate__zoomOut");
    uploaderBox.classList.add("hidden");

    uploadingBox.classList.remove("hidden");
    uploadingBox.classList.add("animate__zoomIn");

    let width = 0;
    const setProgressBarWidth = setInterval(() => {
      if (width === 100) return;
      width = width + 5;

      progressBarWidth(width);
    }, 2000);

    const res = await fetch(/*CORS + */ BASE_URI, {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
      },
      body: formData,
    });
    const data = await res.json();
    progressBarWidth(100);
    clearInterval(setProgressBarWidth);
    if (data.error) {
      progressBarWidth(0);
      throw data.error;
    }

    // set variables
    imageURL = data.url;
    // show success image
    imageSuccessPreview.src = imageURL;
    imageSuccessPreview.alt = data.public_id;
    urlBox.value = imageURL;

    // show success box
    uploadingBox.classList.add("hidden");
    uploadingBox.classList.add("animate__zoomOut");
    uploadingBox.classList.remove("animate__zoomIn");

    imageSuccess.classList.remove("hidden");
    imageSuccess.classList.add("animate__zoomIn");
  } catch (error) {
    uploaderBox.classList.remove("hidden");
    uploaderBox.classList.remove("animate__zoomOut");
    uploaderBox.classList.add("animate__zoomIn");
    // section 2
    uploadingBox.classList.add("animate__zoomOut");
    uploadingBox.classList.remove("animate__zoomIn");
    uploadingBox.classList.add("hidden");

    // display error
    errorText.classList.remove("hidden");
    console.log(error);
  }
}

async function uploadImage() {
  const files = imageInput.files;
  if (files.length === 0) return;
  const file = files[0];

  let formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("tags", "browser_upload");

  await sendToCloudinary(formData);
}

uploadButton.addEventListener("click", function () {
  imageInput.click();
});

imageInput.addEventListener("change", uploadImage);

copyLinkButton.addEventListener("click", function () {
  urlBox.select();
  // copy to clipboard
  document.execCommand("copy");
});
