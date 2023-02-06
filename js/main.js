const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

for(let i = 0; i < dropList.length; i++){
    for(let currency_code in country_code){
        //selecting USD by default as FROM currency and PHP as TO currency

        let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "PHP" ? "selected" : "";
        //creating option tag with passing currency code as a text value
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        //inserting options tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target); //calling loadFlag with passing target element as an argument
    });
}

function loadFlag(element){
    for (let code in country_code){
        if(code == element.value){ //if currency code of country list is equal to option value
            let imgTag = element.parentElement.querySelector("img"); //selecting img tag of particular drop list
            // passing country code of a selected currency code in a img url
            imgTag.src = `https://flagcdn.com/48x36/${country_code[code].toLowerCase()}.png`;

            
        }
    }
}

window.addEventListener("load", () =>{
    getExchangeRate();
});
getButton.addEventListener("click", e =>{
    e.preventDefault(); //preventing form from submitting
    getExchangeRate();
});


const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () =>{
    let tempCode = fromCurrency.value; // temporary currency code of FROM drop list
    fromCurrency.value = toCurrency.value; // passing TO currency code to FROM currency code
    toCurrency.value = tempCode; // passing temporary currency code to TO currency code
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
});

function getExchangeRate(){
    const amount = document.querySelector(".amount input");
    const exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    // if user don't enter any value or enter 0 then we'll put 1 value by default in the input field
    if(amountVal == ""|| amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/2e6e4d21b652961ba0fb0047/latest/${fromCurrency.value}`;

    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let totalEchangeRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalEchangeRate} ${toCurrency.value}`;
    }).catch(() =>{ // if user is offline or any error occured while fetching data then catch function will run
        exchangeRateTxt.innerText = "Something went wrong";
    })
}










