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
let load = document.querySelector('.load');
let mistake = document.querySelector('.mistake');

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
        getMistake ();
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
        getMistake ();
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
        getMistake ();
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
        getMistake ();
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
    getValueLeft();
    getValueRight();

//получение новой валютной пары
changeButton.addEventListener('click', () =>{
    section.classList.toggle('row-reverse');
});       

//Описание загрузки и ошибки
function getMistake () {
    fetch(`https://api.ratesapi.io/api/latest?base=${currencyFrom}&symbols=${currencyTo}`)
    .then(res => res.json())
    .then(data => {
        if(data) {
            mistake.style.display = 'none';
            load.style.display = 'none';
            clearTimeout();
        } else {
            setTimeout(() => {
                load.style.display = 'block';
            }, 5);
        };
    })
    .catch(error => {
        mistake.style.display = 'flex';
    });
};
