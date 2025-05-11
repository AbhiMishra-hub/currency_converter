// console.log("hello");
const Base_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdown = document.querySelectorAll("select");
const btn = document.querySelector("#btn_in");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
// for (code in countryList){
//     console.log(code,countryList[code]);
// }

// for(option of dropdown){
//     console.log(option);
// }

for (let select of dropdown) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
const updateFlag = (code) => {
  // console.log(code);
  let currCode = code.value;
  countryCode = countryList[currCode];
  console.log(countryCode);
  let img = code.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
};

btn.addEventListener("click", async (evt) => {
  let amount = document.querySelector(".textarea1 input");
  let amtval = amount.value;
  if (amtval === "" || amtval < 0) {
    amtval = 1;
    amount.value = 1;
  }
  console.log(fromcurr.value.toLowerCase());
  console.log(tocurr.value.toLowerCase());
  const url = `${Base_URL}/${fromcurr.value.toLowerCase()}.json`; // dollar selected as base

  let response = await fetch(url);

  let data = await response.json();
  let rate = data[fromcurr.value.toLowerCase()];
  let finalrate = rate[tocurr.value.toLowerCase()];

  let finalamt = finalrate * amtval;

  let showamt = document.querySelector(".textarea2 input");
  showamt.value = finalamt;

  const msg = document.querySelector(".msg");
  msg.innerText = `1 ${fromcurr.value} = ${finalrate} ${tocurr.value}`;
});
