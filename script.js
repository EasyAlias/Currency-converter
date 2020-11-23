


const buttonCurrency = document.querySelectorAll (".currency-list__item");
const leftValueOneUnits = document.querySelector('.left-input-currency__rate-p')
const rightValueOneUnits = document.querySelector('.right-input-currency__rate-p')

let leftCurrency;

buttonCurrency.forEach((el) => {
    el.addEventListener('click', (event) => {
        leftCurrency = event.target.innerText;
    })
    return leftCurrency;
})

console.log(leftCurrency)




    
        // fetch('https://api.ratesapi.io/api/latest')
        // .then((res) => {
        //     return res.json();
        // }).then((data) => {
        //     if (data.rates.hasOwnProperty(leftCurrency)) {
        //         leftValueOneUnits.innerText = `1 ${currency}` = ;
        //     }
        //    data.forEach((elem) => {               
        //     const rates = elem;
            
                // rates.forEach((element) => {
                //     const value = element;
                //         if(currency === value.)            
                //         valueOneUnits.innerText = 
                // })



         
    // })
// })
  













