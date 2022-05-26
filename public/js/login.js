import axios from 'axios'; // Axios library for fetch api
import { popAlert } from './alert';

// Login function
export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    // Login successfully
    // Redirect to home page
    if (res.data.status === 'success' && res.data.data.user.role === 'user') {
      // Pop mesage about login success
      popAlert('success', 'Logged in successfully!');

      // After 0.5 secs redirect to home page
      window.setTimeout(() => {
        location.assign('/');
      }, 500);
    }

    // Admin Page
    if (res.data.status === 'success' && res.data.data.user.role === 'admin') {
      popAlert('success', 'Logged in successfully!');

      // redirect to adminPanel
      window.setTimeout(() => {
        location.assign('/admin/dashboard');
      }, 500);
    }
  } catch (err) {
    popAlert('error', err.response.data.message);
  }
};

// SignUp Function
export const signUp = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    // SignUp success
    // Redirect to shopme page
    if (res.data.status === 'success') {
      // Pop message about signup success
      popAlert('success', 'Account created successfully');

      // After 1secs redirect to home page
      window.setTimeout(() => {
        location.assign('/');
      }, 500);
    }
  } catch (err) {
    popAlert('error', err.response.data.message);
  }
};

// Logout Function
export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });

    if (res.data.status === 'success') {
      // Hack for location.reload(true);
      window.setTimeout(() => {
        location.assign('/');
      }, 2000);
    }
  } catch (err) {
    popAlert('error', 'Error logging out! Try again.');
  }
};
