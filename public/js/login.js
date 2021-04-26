import axios from 'axios'; // Axios library for fetch api
import { popAlert } from './alert';

// Login function
export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    // Login successfully
    // Redirect to home page
    if (res.data.status === 'success') {
      // Pop meesage about login success
      popAlert('success', 'Logged in successfully!');

      // After 1secs redirect to home page
      window.setTimeout(() => {
        location.assign('/');
      }, 500);
    }
    console.log(res);
  } catch (err) {
    popAlert('error', err.response.data.message);
  }
};

// Logout Function
export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/users/logout',
    });

    if (res.data.status === 'success') {
      // Hack for location.reload(true);
      window.setTimeout(() => {
        location.reload();
      }, 2000);
    }
  } catch (err) {
    console.log(err.response);
    popAlert('error', 'Error logging out! Try again.');
  }
};
