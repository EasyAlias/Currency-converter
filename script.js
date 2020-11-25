

let leftButtons = document.querySelectorAll (".left-button");
let rightButtons = document.querySelectorAll (".right-button");
let leftSelect = document.querySelectorAll (".left-select");
console.log(leftSelect)
let rightSelect = document.querySelectorAll (".right-select");
let leftValueOneUnits = document.querySelector('.left-input-currency__rate-p');
let rightValueOneUnits = document.querySelector('.right-input-currency__rate-p');
let select = document.querySelectorAll('.currency-list__change');
let leftInput = document.querySelector('.left-input');
let rightInput = document.querySelector('.right-input');

leftInput.value = 1;
rightInput.value;
let currencyFrom = 'RUB';
let currencyTo = 'USD';





select.forEach((elem) => {
    // const getCurrency = () => { // если для одного из списков
        fetch('https://api.ratesapi.io/api/latest')
        .then((res) => {
                return res.json();
            }).then((data) => {       
                let keysArr = Object.keys(data.rates);

                keysArr.forEach((el) => {
                            let option = document.createElement('option');
                            option.innerHTML = el;
                            option.classList.add('option-in');
                            elem.append(option);
                            
                        });
                    })    
                    // }
})
// getCurrency();

leftButtons.forEach((el) => {
    el.addEventListener('click', () => {
        leftButtons.forEach(elem => {
            elem.classList.remove('active');
        })
        el.classList.add('active');
        currencyFrom = el.innerText;
        getValue(currencyFrom, currencyTo, leftInput, rightInput);
    })
});

leftSelect.forEach((el) => {
    el.addEventListener('change', (event) => {
        leftSelect.forEach(elem => {
            elem.classList.remove('active');
        })
        el.classList/add('active');
        currencyFrom = el.innerText;
        getValue(currencyFrom, currencyTo, leftInput, rightInput);
    })
})


rightButtons.forEach((el) => {
    el.addEventListener('click', () => {
        rightButtons.forEach(elem => {
            elem.classList.remove('active');
        })
        el.classList.add('active');
        currencyTo = el.innerText;
        getValue(currencyFrom, currencyTo, leftInput, rightInput);
    })
});


function getValue(currencyFrom, currencyTo, leftInput, rightInput) {

    fetch(`https://api.ratesapi.io/api/latest?base=${currencyFrom}&symbols=${currencyTo}`)
        .then(res => res.json())
        .then(data => {
            if (currencyFrom === currencyTo) {
                return leftValueOneUnits.innerText = '';
            }
            leftValueOneUnits.innerText = `1 ${currencyFrom} = ${data.rates[currencyTo].toFixed(4)} ${currencyTo}`
            rightInput.value = leftInput.value * data.rates[currencyTo].toFixed(4);
        })

    fetch(`https://api.ratesapi.io/api/latest?base=${currencyTo}&symbols=${currencyFrom}`)
        .then(res => res.json())
        .then(data => {
            if (currencyFrom === currencyTo) {
                return rightValueOneUnits.innerText = '';
            }
            rightValueOneUnits.innerText = `1 ${currencyTo} = ${data.rates[currencyFrom].toFixed(4)} ${currencyFrom}`;
        })
}

getValue(currencyFrom, currencyTo, leftInput, rightInput)