let resultElm = document.getElementById("result");
let fromCurrencyElm = document.getElementById("from-currency");
let toCurrencyElm = document.getElementById("to-currency");
let currencyResult;
let fromCurrency = "eur",
  toCurrency = "usd";

const getCurrecncyData = (from, to) => {
  fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}`)
    .then((res) => res.json())
    .then((response) => {
      if (response.result) {
        currencyResult = response.result?.toFixed(2);
        resultElm.innerText = currencyResult;
        resultElm.style.backgroundColor = generateLightColorHex();
        fromCurrency = from;
        toCurrency = to;
        fromCurrencyElm.innerHTML = response.query.from.toUpperCase();
        toCurrencyElm.innerHTML = response.query.to.toUpperCase();
      } else {
        showMessage("We could not find this currecy");
      }
    });
};

getCurrecncyData(fromCurrency, toCurrency);

var getCurrencyInterval = window.setInterval(function () {
  getCurrecncyData(fromCurrency, toCurrency);
}, 3000);

function generateLightColorHex() {
  let color = "#";
  for (let i = 0; i < 3; i++)
    color += (
      "0" + Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)
    ).slice(-2);
  return color;
}

document.querySelector("form").onsubmit = (event) => {
  event.preventDefault();
  let fromValue = event.target[0].value;
  let toValue = event.target[1].value;
  if (fromValue && toValue) {
    getCurrecncyData(fromValue, toValue);
    event.target[0].value = "";
    event.target[1].value = "";
  }
};

const showMessage = (message) => {
  Toastify({
    text: message,
    duration: 3000,
    // destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
};
