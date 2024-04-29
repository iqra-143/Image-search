const accessKey = "0_VsQSoS8vJmQhARgY-KqDMg9p_6UJXeBs23QQoMzJk";
const formEl = document.querySelector("form");
const inputi = document.getElementById("search-input");
const search_result = document.querySelector(".search_results");
const button1 = document.getElementById("show_more");
let inputData = "";
let page = 1;

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

async function searchImage() {
  inputData = inputi.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data);

    const results = data.results;

    if (page === 1) {
      search_result.innerHTML = "";
    }
    document.body.style.backgroundColor = getRandomColor();
    results.map((result) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("search-result");

      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description;

      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank";
      imageLink.textContent = result.alt_description;

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);
      search_result.appendChild(imageWrapper);
    });

    page++;

    if (page > 1) {
      button1.style.display = "block";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1; // Reset the page to 1 for a new search
  searchImage();
});

button1.addEventListener("click", (event) => {
  event.preventDefault();
  searchImage();
});
