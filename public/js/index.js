import { login, logout } from './login';
import { displayMap } from './mapbox';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
// console.log('hello from the client side');

const spinner = document.getElementById('loading-spinner');
document.addEventListener('DOMContentLoaded', () => {
  // console.log('DOM fully loaded and parsed');
  const showSpinner = () => spinner.classList.remove('hidden');
  showSpinner();
  // console.log('spinner');
});
const hideSpinner = () => spinner.classList.add('hidden');
window.addEventListener('load', () => {
  setTimeout(hideSpinner, 100);
  // hideSpinner();
  // console.log('hide spinner');
});

const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const updateUserDataForm = document.querySelector('.form-user-data');
const updateUserPasswordForm = document.querySelector('.form-user-settings');
const logoutBtn = document.querySelector('.nav__el--logout');
const bookBtn = document.getElementById('book-tour');

// map
if (mapBox) {
  const locations = JSON.parse(
    document.getElementById('map').dataset.locations,
  );
  // console.log('dislaping');
  displayMap(locations);
}

// login
if (loginForm) {
  document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logoutBtn) logoutBtn.addEventListener('click', logout);

if (updateUserDataForm) {
  updateUserDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();

    // const email = document.getElementById('email').value;
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);
    // console.log(name, email);
    // updateSettings({ name, email });
    // console.log(form);
    // console.log(form.get('photo'));
    updateSettings(form, 'data');
  });
}
if (updateUserPasswordForm) {
  updateUserPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const currentPassword = document.getElementById('password-current').value;
    const newPassword = document.getElementById('password').value;
    const confirmNewPassword =
      document.getElementById('password-confirm').value;
    document.querySelector('.form-user-settings .btn').innerHTML =
      'loading....';

    await updateSettings(
      { currentPassword, newPassword, confirmNewPassword },
      'password',
    );
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
    document.querySelector('.form-user-settings .btn').innerHTML =
      'save password';
  });
}

if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
}
