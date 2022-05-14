const prices = document.querySelector('.prices');
const loginModal = document.querySelector('.loginModal');
const loginButton = document.querySelector('.loginButton');
const logoutButton = document.querySelector('.logoutButton');
const cartIcon = document.querySelector('.cart');

const [email, pass] = document.getElementsByTagName('input');

if(localStorage.idTicket === undefined) {
    localStorage.idTicket = 1;
}

if( localStorage.isLoggedIn === undefined ) {
    localStorage.isLoggedIn = 'false';
}

if( localStorage.isLoggedIn === 'false' ) {
    cartIcon.style.display = 'none';
    prices.style.display = 'none';
    loginModal.style.display = 'flex';
    logoutButton.style.display = 'none';
} else {
    prices.style.display = 'flex';
    cartIcon.style.display = 'block';
}

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

loginButton.addEventListener('click', () => {
    if(email.value === "" || pass.value === "") {
        alert('Invalid input');
        email.style.backgroundColor = '#ff4c29';
        pass.style.backgroundColor = '#ff4c29';
    } else if( !emailRegex.test(email.value) ) {
        console.log('Bad email');
        email.style.backgroundColor = '#ff4c29';
    } else if( !passRegex.test(pass.value) ) {
        console.log('Bad password');
        pass.style.backgroundColor = '#ff4c29';
        alert('Password must contain at least 1 lower case letter, 1 upper case letter, 1 number and length >= 8!');
    } else {
        email.value = "";
        pass.value = "";
        pass.style.backgroundColor = '#ffffff';
        email.style.backgroundColor = '#ffffff';
        localStorage.isLoggedIn = 'true';
        prices.style.display = 'flex';
        loginModal.style.display = 'none';
        logoutButton.style.display = 'block';
        cartIcon.style.display = 'block';
    }
});

logoutButton.addEventListener('click', () => {
    cartIcon.style.display = 'none';
    localStorage.isLoggedIn = 'false';
    prices.style.display = 'none';
    loginModal.style.display = 'flex';
    logoutButton.style.display = 'none';
});


//Partea de formular
const formular = document.querySelector('.formular');
const submitButton = document.querySelector('.submit');

formular.addEventListener('submit', (e) => {
    e.preventDefault();
});

prices.addEventListener('click', () => {
    formular.style.display = 'flex';
    prices.style.display = 'none';
});

submitButton.addEventListener('click', (e) => {
    formular.style.display = 'none';
    prices.style.display = 'flex';

    let data = {
        id: localStorage.idTicket,
        name: formular.elements['name'].value,
        happy: formular.elements['range'].value,
        age: formular.elements['number'].value,
        firstFly: formular.elements['radio'].value,
        type: formular.elements['select'].value
    }

    localStorage.idTicket = +localStorage.idTicket + 1;

    fetch('http://localhost:3000/chart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
        })
        .then()

    formular.submit();
});

cartIcon.addEventListener('click', () => {
    window.location.href = "http://localhost:3000/chart";
    fetch('http://localhost:3000/chart', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }})
        .then()
});