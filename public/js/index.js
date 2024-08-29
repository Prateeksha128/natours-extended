/* eslint-disable */
import '@babel/polyfill';
import { login, logout, signup } from './login';
import { displayMap } from './leaflet';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
import { addReview } from './review';

// DOM ELEMENTS
const mapview = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const UserPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');
const reviewBtn = document.getElementById('add-review');
const submitBtn = document.getElementById('submit-review');
const reviewForm = document.getElementById('review-form');

// DELEGATION
if (mapview) {
  const locations = JSON.parse(document.getElementById('map').dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // console.log(email, password);
    login(email, password);
  });
}

if (signupForm) {
  console.log('here2222');

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(document.querySelector('.btn--signup').textContent);

    document.querySelector('.btn--signup').textContent = 'Signing in...';
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    console.log(name, email, password, passwordConfirm);
    await signup(name, email, password, passwordConfirm);
    document.querySelector('.btn--signup').textContent = 'Sign Up';
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

if (userDataForm) {
  userDataForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-settings').textContent = 'Updating...';
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    await updateSettings(form, 'data');

    document.querySelector('.btn--save-settings').textContent = 'Save settings';
  });
}

if (UserPasswordForm) {
  UserPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings({ passwordCurrent, password, passwordConfirm }, 'password');

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (bookBtn) {
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    console.log(tourId);
    bookTour(tourId);
  });
}
if (reviewBtn) {
  reviewBtn.addEventListener('click', (e) => {
    console.log('here');
    reviewForm.classList.remove('hidden');
  });
}

if (submitBtn) {
  reviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('form submit');
    console.log(e.target);
    

    const review = document.getElementById('review').value;
    const rating = document.getElementById('rating').value;
    const { tourId } = e.target.dataset;
    console.log([review, rating, tourId]);
    document.getElementById('review').value = '';
    document.getElementById('rating').value = '';
    await addReview(rating, review, tourId);

    reviewForm.classList.add('hidden');
  });
}
