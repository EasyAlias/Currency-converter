

let leftButtons = document.querySelectorAll(".left-button");
let rightButtons = document.querySelectorAll(".right-button");
let leftSelect = document.querySelectorAll(".left-select");
let rightSelect = document.querySelectorAll(".right-select");
let leftValueOneUnits = document.querySelector('.left-input-currency__rate-p');
let rightValueOneUnits = document.querySelector('.right-input-currency__rate-p');
let select = document.querySelectorAll('.currency-list__change');
let leftInput = document.querySelector('.left-input');
let rightInput = document.querySelector('.right-input');
let changeButton = document.querySelector('.button-change__first');

let options = []; 

leftInput.value = 1;
rightInput.value;
let currencyFrom = 'RUB';
let currencyTo = 'USD';


// создаем элементы в select => option

select.forEach((elem) => {
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
                        options.push(option);
                    });
        })    
})

// обрабатываем кники по button and select left input

leftButtons.forEach((el) => {
    el.addEventListener('click', () => {
        leftButtons.forEach(elem => {
            elem.classList.remove('active');
        })
        leftSelect.forEach(elem => {
            elem.classList.remove('active');
        })
        el.classList.add('active');
        currencyFrom = el.innerText;
        getValueLeft(currencyFrom, currencyTo, leftInput, rightInput);
        getValueRight(currencyFrom, currencyTo, leftInput, rightInput);
    })
});

leftSelect.forEach((el) => {
    el.addEventListener('change', (event) => {
        // console.log(event.target.value);
        leftButtons.forEach(elem => {
            elem.classList.remove('active');
        })
        leftSelect.forEach(el => {
            el.classList.remove('active');
        })

        el.classList.add('active');
        options.forEach(el => {
            el.classList.remove('active');
            if(event.target.value === el.innerText) {
                el.classList.add('active');
            } 
        })
        currencyFrom = el.value;
        getValueLeft(currencyFrom, currencyTo, leftInput, rightInput);
        getValueRight(currencyFrom, currencyTo, leftInput, rightInput);
    })
})

// обрабатываем кники по button and select right input

rightButtons.forEach((el) => {
    el.addEventListener('click', () => {
        rightButtons.forEach(elem => {
            elem.classList.remove('active');
        })
        rightSelect.forEach(elem => {
            elem.classList.remove('active');
        })
        el.classList.add('active');
        currencyTo = el.innerText;
        getValueLeft(currencyFrom, currencyTo, leftInput, rightInput);
        getValueRight(currencyFrom, currencyTo, leftInput, rightInput);
    })
});

rightSelect.forEach((el) => {
    el.addEventListener('change', () => {
        rightButtons.forEach(elem => {
            elem.classList.remove('active');
        })
        rightSelect.forEach(elem => {
            elem.classList.remove('active');
        })
        el.classList.add('active');
        currencyTo = el.value;
        getValueLeft(currencyFrom, currencyTo, leftInput, rightInput);
        getValueRight(currencyFrom, currencyTo, leftInput, rightInput);
    })
})



function getValueLeft(currencyFrom, currencyTo, leftInput, rightInput) {

    fetch(`https://api.ratesapi.io/api/latest?base=${currencyFrom}&symbols=${currencyTo}`)
        .then(res => res.json())
        .then(data => {
            if (currencyFrom === currencyTo) {
                rightInput.value = leftInput.value;
                return leftValueOneUnits.innerText = '';
            }
            leftValueOneUnits.innerText = `1 ${currencyFrom} = ${data.rates[currencyTo].toFixed(4)} ${currencyTo}`
            console.log(rightInput.value = leftInput.value * data.rates[currencyTo].toFixed(4));
        })
}

function getValueRight(currencyFrom, currencyTo, leftInput, rightInput) {
    fetch(`https://api.ratesapi.io/api/latest?base=${currencyTo}&symbols=${currencyFrom}`)
        .then(res => res.json())
        .then(data => {
            if (currencyFrom === currencyTo) {
                return rightValueOneUnits.innerText = '';
            }
            rightValueOneUnits.innerText = `1 ${currencyTo} = ${data.rates[currencyFrom].toFixed(4)} ${currencyFrom}`;
            console.log(leftInput.value = rightInput.value * data.rates[currencyFrom].toFixed(4));
        })
    
}

        // changeButton.addEventListener('click', (event) => {
            
        // })

        
        getValueLeft(currencyFrom, currencyTo, leftInput, rightInput);
        getValueRight(currencyFrom, currencyTo, leftInput, rightInput);