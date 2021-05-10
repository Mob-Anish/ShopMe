import { popAlert } from './alert';
const input = document.querySelector('.nav__search-input');

export const search = async (name) => {
  try {
    location.assign(`/search/?keyword=${name}`);
    input.value = '';
    input.blur();
  } catch (err) {
    popAlert('error', err.response.data.message);
  }
};
