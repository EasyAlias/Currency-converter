

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
let section = document.querySelector('.section');

let options = []; 

leftInput.value = 1;
// let valueLeftInput = Number (leftInput.value).toFixed(4);
rightInput.value;
// let valueRightInput = Number (rightInput.value).toFixed(4);
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
        getValueLeft();
        getValueRight();
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
        getValueLeft();
        getValueRight();
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
        getValueLeft();
        getValueRight();
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
        getValueLeft();
        getValueRight();
    })
})

//создаем функции для обработки значений в полях input
function getValueLeft() {

    fetch(`https://api.ratesapi.io/api/latest?base=${currencyFrom}&symbols=${currencyTo}`)
        .then(res => res.json())
        .then(data => {
            if (currencyFrom === currencyTo) {
                rightInput.value = leftInput.value;
                return leftValueOneUnits.innerText = '';
            }
            leftValueOneUnits.innerText = `1 ${currencyFrom} = ${data.rates[currencyTo].toFixed(4)} ${currencyTo}`
            rightInput.value = leftInput.value * data.rates[currencyTo].toFixed(4);
        })
}

function getValueRight() {
    fetch(`https://api.ratesapi.io/api/latest?base=${currencyTo}&symbols=${currencyFrom}`)
        .then(res => res.json())
        .then(data => {
            if (currencyFrom === currencyTo) {
                return rightValueOneUnits.innerText = '';
            }
            rightValueOneUnits.innerText = `1 ${currencyTo} = ${data.rates[currencyFrom].toFixed(4)} ${currencyFrom}`;
            leftInput.value = rightInput.value * data.rates[currencyFrom].toFixed(4);
        })    
}

//замена контейнеров
changeButton.addEventListener('click', () =>{
    section.classList.toggle('row-reverse');
});

        changeButton.addEventListener('click', () => {
            getValueChange() 
        })

        getValueLeft();
        getValueRight();
