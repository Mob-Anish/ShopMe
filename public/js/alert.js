// Removing alert text
export const hideAlert = () => {
  const el = document.querySelector('.alert');
  // Remove alert text
  if (el) el.parentElement.removeChild(el);
};

// type is 'success' or 'error'
export const popAlert = (type, msg) => {
  hideAlert(); // just to make sure to hide alert at start
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('main').insertAdjacentHTML('beforeend', markup);
  window.setTimeout(hideAlert, 2000); // Showing alert message for 2s
};
