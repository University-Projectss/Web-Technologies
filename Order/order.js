const prices = document.querySelector('.prices');
const loginModal = document.querySelector('.loginModal');
const loginButton = document.querySelector('.loginButton');
const logoutButton = document.querySelector('.logoutButton');

const [email, pass] = document.getElementsByTagName('input');

if( localStorage.isLoggedIn === undefined ) {
    localStorage.isLoggedIn = 'false';
}

if( localStorage.isLoggedIn === 'false' ) {
    prices.style.display = 'none';
    loginModal.style.display = 'flex';
    logoutButton.style.display = 'none';
} else {
    prices.style.display = 'flex';
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
    }
    // else if( localStorage.email === "" && localStorage.pass === "" ) {
    //     localStorage.isLoggedIn = 'true';
    //     prices.style.display = 'flex';
    //     loginModal.style.display = 'none';
    //     logoutButton.style.display = 'block';

    //     localStorage.email = email.value;
    //     localStorage.pass = pass.value;
    // } else if( localStorage.email === email.value && localStorage.pass === pass.value ) {
    //     localStorage.isLoggedIn = 'true';
    //     prices.style.display = 'flex';
    //     loginModal.style.display = 'none';
    //     logoutButton.style.display = 'block';
    // } else {
    //     alert('Invalid input');
    // }
});

logoutButton.addEventListener('click', () => {
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
});