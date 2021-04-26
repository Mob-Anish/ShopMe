import '@babel/polyfill';
import { login, logout } from './login'; // login and logout function
import { orderProduct } from './stripe';

const loginForm = document.querySelector('.form');
const logoutBtn = document.querySelector('.nav__el--logout');
const buyBtn = document.querySelector('#buy-product');

// Login Button Event
if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    console.log('hello');
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

// Buy Button Event
if (buyBtn)
  buyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.target.textContent = 'Processing ....';
    const { productId } = e.target.dataset; // Getting id from btn data of buy now
    orderProduct(productId);
  });
