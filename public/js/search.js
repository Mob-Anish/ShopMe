import axios from 'axios'; // Axios library for fetch api
import { popAlert } from './alert';

export const search = async (name) => {
  try {
    location.assign(`/?name=${name}`);
  } catch (err) {
    popAlert('error', err.response.data.message);
  }
};
