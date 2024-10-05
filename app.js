// const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const BASE_URL = "https://v6.exchangerate-api.com/v6/cc55f721f047119095f9b44e/pair";

const dropdown = document.querySelectorAll(".main_div select");
const mainButton = document.querySelector(".convertBtn button");
const fromCurr = document.querySelector(".fromDiv select");
const toCurr = document.querySelector(".toDiv select");
const msg = document.querySelector(".msg-div p");


for (let select of dropdown) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = `${countryList[currCode]} - ${currCode}`;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "INR") {
            newOption.selected = "selected"; 
        }
        else if (select.name === "to" && currCode === "RUB") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".ammountDiv input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amtVal.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}`;

    let response = await fetch(URL);
    let data = await response.json();
    let conversion_rate = data.conversion_rate;
    let final_rate = amtVal * conversion_rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${final_rate} ${toCurr.value}`
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

    if (element.name === "from") {
        document.querySelector(".fromFleg img").src = newSrc;
    } else if (element.name === "to") {
        document.querySelector(".toFleg img").src = newSrc;
    }
};

mainButton.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
})
