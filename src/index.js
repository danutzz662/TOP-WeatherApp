import "./styles.css";

const formInput = document.getElementById("input");
const formError = document.querySelector("span.error");
const form = document.querySelector("form");
formInput.addEventListener("input", () => {
  if (formInput.validity.valid) {
    formError.textContent = "";
    formError.className = "error";
  } else {
    showErrors();
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!formInput.validity.valid) {
    showErrors();
    return;
  }
  setLoading(true);
  displayInfo(false);
  const data = await getData(formInput.value);
  if (data) {
    renderWeather(data);
  } else {
    formError.textContent = "Couldn't find that location. Try another search.";
    formError.className = "error active";
  }
  setLoading(false);
  displayInfo(true);
});

function showErrors() {
  if (formInput.validity.valueMissing) {
    formError.textContent = "Please enter a location.";
  } else if (formInput.validity.patternMismatch) {
    formError.textContent = "Please enter a location using only letters.";
  }
  formError.className = "error active";
}

async function getData(name) {
  if (!name) return;
  try {
    const returnedData = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${name}?unitGroup=metric&key=XBX8ZQSME2GSNVSYH29NAYSQ3&contentType=json`,
    );
    if (!returnedData.ok) {
      const errText = await returnedData.text();
      throw new Error(`Weather API error ${returnedData.status}: ${errText}`);
    }
    return await returnedData.json();
  } catch (error) {
    console.error(error);
  }
}

async function renderWeather(data) {
  const tempMin = document.querySelector(".min");
  const tempMax = document.querySelector(".max");
  const tempMain = document.querySelector(".temp-main");
  tempMin.textContent = `min:${data.days[0].tempmin}`;
  tempMax.textContent = `max:${data.days[0].tempmax}`;
  tempMain.textContent = `${data.days[0].temp}`;
  const coverage = document.querySelector(".coverage-info");
  const humidity = document.querySelector(".humidity-info");
  coverage.textContent = `${data.days[0].cloudcover}`;
  humidity.textContent = `${data.days[0].humidity}`;
  const uv = document.querySelector(".uv-info");
  const wind = document.querySelector(".wind-info");
  uv.textContent = `${data.days[0].uvindex}`;
  wind.textContent = `${data.days[0].windspeed}`;
  const description = document.querySelector(".description");
  description.textContent = `${data.days[0].description}`;
  try {
    const imageContainer = document.querySelector(".right");
    const image = document.createElement("img");
    const seachParam = data.days[0].conditions;
    const newParam = seachParam.split(",");
    const gif = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=jTvd1kg2OYfrcVOB6kCfgQuWCF2Mpy4R&s=${newParam[0]}`,
    );
    if (!gif.ok) throw new Error(`Giphy API error: ${gif.status}`);
    const jsonGif = await gif.json();
    if (!jsonGif.data || !jsonGif.data.images) {
      console.warn("No GIF found for:", newParam[0]);
      return;
    }
    image.src = jsonGif.data.images.original.url;
    imageContainer.replaceChildren(image);
  } catch (error) {
    console.error(error);
  }
}
function displayInfo(loaded) {
  const tempContainer = document.querySelector(".temp");
  const humCovContainer = document.querySelector(".humidity-cov");
  const uvWindContainer = document.querySelector(".uv-wind");
  const description = document.querySelector(".description");
  if (!loaded) {
    tempContainer.style.display = "none";
    humCovContainer.style.display = "none";
    uvWindContainer.style.display = "none";
    description.style.display = "none";
  } else {
    tempContainer.style.display = "flex";
    humCovContainer.style.display = "flex";
    uvWindContainer.style.display = "flex";
    description.style.display = "flex";
  }
}

function setLoading(isLoading) {
  const loader = document.querySelector(".loader");
  const submitBtn = document.querySelector('input[type="submit"]');
  loader.style.display = isLoading ? "block" : "none";
  submitBtn.disabled = isLoading;
}
