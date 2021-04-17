import '@babel/polyfill';
import { login, logout } from './login'; // login and logout function

const loginForm = document.querySelector('.form');
const logoutBtn = document.querySelector('.nav__el--logout');

// Login Button Event
if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    login(email, password); // login function
  });

// Logout Button Event
if (logoutBtn)
  logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    logout(); // login function
  });
