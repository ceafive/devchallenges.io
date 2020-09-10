const imageInput = document.querySelector("#upload-box");
const getPhotos = document.querySelector("#get-photos");
imageInput.addEventListener("change", getFileLength);

const UNSPLASH_API =
  "https://cors-anywhere.herokuapp.com/https://api.unsplash.com";

async function sendToUnsplash() {
  try {
    const res = await fetch(UNSPLASH_API + "/collections/5008876/add", {
      method: "POST",
      headers: {
        Authorization: "Client-ID xeRI4LhdgadCrkeMswdxn0KhU-WAF82Mc5cZP-VgzEc",
        "Accept-Version": "v1",
      },
    });
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

getPhotos.addEventListener("click", sendToUnsplash);

function getFileLength() {
  console.log(imageInput.files);
}
