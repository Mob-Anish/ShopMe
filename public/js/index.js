import '@babel/polyfill';
import { search } from './search';
import { signUp } from './login';
import { login, logout } from './login'; // login and logout function
import { orderProduct } from './stripe';

const searchForm = document.querySelector('.nav__search');
const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.signup-form');
const logoutBtn = document.querySelector('.btn--logout');
const buyBtn = document.querySelector('#buy-product');

// Search Form Event
if (searchForm)
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('.nav__search-input').value;
    search(name);
  });

// Login Button Event
if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    login(email, password); // login function
  });

// SignUp Button Event
if (signupForm)
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const passwordConfirm = document.querySelector('#passwordConfirm').value;
    signUp(name, email, password, passwordConfirm); // Signup function
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
