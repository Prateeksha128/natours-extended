import axios from 'axios';
import { showAlert } from './alerts';

export const addReview = async (rating, review, tourId) => {
    console.log('here 222');
    console.log(`/api/v1/tours/${tourId}/reviews`);
    

  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/tours/${tourId}/reviews`,
      data: {
        rating,
        review,
      },
    });
    console.log(res);

    console.log('Response received:');
    // console.log(res);
    if (res.data.status === 'success') {
      console.log('in successs');

      //   showAlert('success', 'Logged in successfully!');
      //   window.setTimeout(() => {
      //     location.assign('/');
      //   }, 500);
    }
  } catch (err) {
    // console.error('Error occurred during login request:', err);
    if (err.response) {
      // console.error('Error response data:', err.response.data);
      showAlert('error', err.response.data.message);
    } else {
      showAlert('error', 'An error occurred. Please try again later.');
    }
  }
};
