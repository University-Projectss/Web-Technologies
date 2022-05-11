//Number of happy customers
const numbersDiv = document.querySelector('.numbers');
numbersDiv.style.padding = '10px';
numbersDiv.style.display = 'flex';
numbersDiv.style.flexDirection = 'column';
numbersDiv.style.justifyContent = 'space-evenly';
numbersDiv.style.alignItems = 'center';

const numbersTitle = document.createElement('h1');
numbersTitle.innerHTML = 'Number of happy customers';
numbersTitle.style.color = 'white';
numbersDiv.style.textAlign = 'center';

let n = 100;

const number = document.createElement('h1');
number.style.color = 'white';
number.style.fontSize = '100px';
number.innerHTML = n;

numbersDiv.appendChild(numbersTitle);
numbersDiv.appendChild(number);


setInterval(() => {
    number.innerHTML = +number.innerHTML + Math.floor(Math.random() * 10 + 1);

    number.classList.add('bump');
    setTimeout(() => {
        number.classList.remove('bump');
    }, 300);
}, 5000);


//Keyboard event for the rocket
const image = document.getElementsByTagName('img')[0];
const rocket = './rocket.png';
const falcon = './falcon.png';
let state = true;

document.addEventListener('keydown', (e) => {
    if( e.code === 'Enter' ) {
        if(state) {
            state = false;
            image.src = falcon;
        } else {
            state = true;
            image.src = rocket;
        }
    }
});


//Mouse event for 'SPACE' + change random property

//Prevent default page scrolling on pressing Space
window.addEventListener('keydown', (e) => {
    if(e.code === 'Space' && e.target == document.body) {
      e.preventDefault();
    }
});

const space = document.getElementById('randomColor');
const letters = '0123456789ABCDEF'; //size 16

const RandomColorFunction = () => {
    let color = '#';

    for(let i = 0; i < 6; i++) {
        color += letters[ Math.floor(Math.random() * 16) ];
    }

    return color;
};

document.addEventListener('keydown', (e) => {
    if( e.code === 'Space' ) {
        space.style.color = RandomColorFunction();
    }
});