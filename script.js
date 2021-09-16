const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const swap = document.getElementById('swap');
const rateEl = document.getElementById('rate');
const flagfromEl = document.getElementById('flag-from');
const flagtoEl = document.getElementById('flag-to');


//const ratelistEl = document.getElementById('ratelist');


function flag(f1) {
  return f1.charAt(0) + f1.charAt(1);
}

// Fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  const flag_one = currency_one.charAt(0) + currency_one.charAt(1);
  const flag_two = currency_two.charAt(0) + currency_two.charAt(1);
  


  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
       
      const rate = data.rates[currency_two];

      //rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      //rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      //rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      //amountEl_two.value = (amountEl_one.value * rate).toFixed(2);

      amountEl_two.value = rate;
      
      rateEl.innerHTML = `<img src="https://www.countryflags.io/${flag_one}/shiny/64.png"></img> <span> 1 ${currency_one} </span> = <span>${rate} ${currency_two} </span><img src="https://www.countryflags.io/${flag_two}/shiny/64.png"></img>`;
      
      Array.from(document.querySelector("#currency-one").options).forEach(function(option_element) {
        let option_text = option_element.text;
        let option_value = option_element.value;
        let is_option_selected = option_element.selected;
    /*
        console.log('Option Text : ' + option_text);
        console.log('Option Value : ' + option_value);
        console.log('Option Selected : ' + (is_option_selected === true ? 'Yes' : 'No'));
    
        console.log("\n\r");
   
        console.log();        
     */
       // ratelistEl.innerHTML += `<img src="https://www.countryflags.io/${flag(option_text)}/shiny/64.png"></img>`; 
        

    });
    

    });
}

// Event listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();
