import "./styles.css";

const formInput = document.getElementById("input");
const formError = document.querySelector("span.error");
const form = document.querySelector("form");
formInput.addEventListener("input", (event) => {
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
  const data = await getData(formInput.value);
  console.log(data);
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
    return await returnedData.json();
  } catch (error) {
    console.error(error);
  }
}

