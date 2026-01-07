const converterForm = document.getElementById("converter-form");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");

window.addEventListener("load", fetchCurrencies);

converterForm.addEventListener("submit", convertCurrency);

async function fetchCurrencies() {
  // https://api.exchangerate-api.com/v4/latest/USD
  const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
  const data = await response.json();

  console.log(data);
  const currencyOptions = Object.keys(data.rates);

  currencyOptions.forEach((currency) => {
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.textContent = currency;
    fromCurrency.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = currency;
    option2.textContent = currency;
    toCurrency.appendChild(option2);
  });
}

async function convertCurrency(e) {
  e.preventDefault();

  const amount = parseFloat(amountInput.value);
  const fromCurrencyValue = fromCurrency.value;
  const toCurrencyValue = toCurrency.value;

  if (amount < 0) {
    alert("Please ener a valid amount");
    return;
  }

  const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrencyValue}`);
  const data = await response.json();

  const rate = data.rates[toCurrencyValue];
  const convertedAmount = (amount * rate).toFixed(2);

  resultDiv.textContent = `${amount} ${fromCurrencyValue} = ${convertedAmount} ${toCurrencyValue}`;
}
$(document).ready(function () {
  $(".currency-select").select2({
    dropdownAutoWidth: true,
    width: "100%",
    placeholder: "Select currency",
  });
});
async function fetchCurrencies() {
  const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
  const data = await response.json();

  const currencyOptions = Object.keys(data.rates);

  currencyOptions.forEach(currency => {
    fromCurrency.add(new Option(currency, currency));
    toCurrency.add(new Option(currency, currency));
  });

  // Default selection
  fromCurrency.value = "USD";
  toCurrency.value = "INR";

  $(".currency-select").trigger("change");

  // Last updated time
//   document.getElementById("last-updated").textContent =
//     `Last updated: ${new Date(data.time_last_updated * 1000).toLocaleString()}`;
}
document.getElementById("swap-btn").addEventListener("click", () => {
  const fromValue = fromCurrency.value;
  const toValue = toCurrency.value;

  fromCurrency.value = toValue;
  toCurrency.value = fromValue;

  $(".currency-select").trigger("change");
});
